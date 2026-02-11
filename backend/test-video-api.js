// Test script for video API endpoints
const API_BASE_URL = 'http://localhost:5001/api';

async function testVideoToken() {
  console.log('\n🧪 Testing Video Token Endpoint...\n');
  
  try {
    const response = await fetch(`${API_BASE_URL}/video/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identity: 'test-user-123',
        room: 'consultation-room-1'
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ SUCCESS: Token generated');
      console.log('Response:', {
        success: data.success,
        tokenLength: data.token?.length || 0,
        hasToken: !!data.token
      });
      
      if (data.token) {
        console.log('Token preview:', data.token.substring(0, 50) + '...');
      }
      
      return true;
    } else {
      console.error('❌ FAILED: Token generation failed');
      console.error('Response:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ FAILED: Token generation failed');
    console.error('Error:', error.message);
    return false;
  }
}

async function testValidateRoom() {
  console.log('\n🧪 Testing Room Validation Endpoint...\n');
  
  try {
    const response = await fetch(`${API_BASE_URL}/video/validate/consultation-room-1`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS: Room validated');
      console.log('Response:', data);
      return true;
    } else {
      console.error('❌ FAILED: Room validation failed');
      console.error('Response:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ FAILED: Room validation failed');
    console.error('Error:', error.message);
    return false;
  }
}

async function testInvalidRoom() {
  console.log('\n🧪 Testing Invalid Room Name...\n');
  
  try {
    const response = await fetch(`${API_BASE_URL}/video/validate/invalid-room`);
    const data = await response.json();
    
    if (response.ok && data.valid === false) {
      console.log('✅ SUCCESS: Invalid room correctly rejected');
      console.log('Response:', data);
      return true;
    } else {
      console.error('❌ FAILED: Invalid room test failed');
      console.error('Response:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ FAILED: Room validation test failed');
    console.error('Error:', error.message);
    return false;
  }
}

async function testMissingFields() {
  console.log('\n🧪 Testing Missing Required Fields...\n');
  
  try {
    const response = await fetch(`${API_BASE_URL}/video/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identity: 'test-user'
        // Missing room
      })
    });
    
    const data = await response.json();
    
    if (response.status === 400) {
      console.log('✅ SUCCESS: Correctly rejected missing fields');
      console.log('Error message:', data.message);
      return true;
    } else {
      console.error('❌ FAILED: Should have returned 400 error');
      console.error('Response:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ FAILED: Unexpected error');
    console.error('Error:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('='.repeat(50));
  console.log('🚀 Video API Testing Suite');
  console.log('='.repeat(50));
  
  const results = {
    tokenTest: await testVideoToken(),
    validateRoomTest: await testValidateRoom(),
    invalidRoomTest: await testInvalidRoom(),
    missingFieldsTest: await testMissingFields()
  };
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Results Summary');
  console.log('='.repeat(50));
  console.log('Token Generation:', results.tokenTest ? '✅ PASS' : '❌ FAIL');
  console.log('Room Validation:', results.validateRoomTest ? '✅ PASS' : '❌ FAIL');
  console.log('Invalid Room Test:', results.invalidRoomTest ? '✅ PASS' : '❌ FAIL');
  console.log('Missing Fields Test:', results.missingFieldsTest ? '✅ PASS' : '❌ FAIL');
  
  const allPassed = Object.values(results).every(r => r === true);
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
  }
  console.log('='.repeat(50) + '\n');
}

// Run tests
runAllTests().catch(console.error);
