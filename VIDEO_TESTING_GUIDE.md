# Video Call Testing Guide

## ✅ Fixed Issues

1. **Identity Error Fixed**: Twilio AccessToken now receives `identity` in constructor options
2. **Routes Registered**: Video routes are now properly registered in server.js
3. **ES Modules**: All video files converted to ES modules

## 🧪 Testing Methods

### Method 1: Automated Test Script (Recommended)

Run the automated test script:

```bash
cd backend
node test-video-api.js
```

This will test:
- ✅ Token generation
- ✅ Room validation
- ✅ Invalid room handling
- ✅ Missing fields validation

### Method 2: Manual API Testing with cURL

#### Test 1: Generate Video Token
```bash
curl -X POST http://localhost:5001/api/video/token \
  -H "Content-Type: application/json" \
  -d '{
    "identity": "doctor-123",
    "room": "consultation-room-1"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Test 2: Validate Room
```bash
curl http://localhost:5001/api/video/validate/consultation-room-1
```

**Expected Response:**
```json
{
  "success": true,
  "valid": true
}
```

#### Test 3: Test Invalid Room
```bash
curl http://localhost:5001/api/video/validate/invalid-room
```

**Expected Response:**
```json
{
  "success": true,
  "valid": false
}
```

#### Test 4: Test Missing Fields (Should Fail)
```bash
curl -X POST http://localhost:5001/api/video/token \
  -H "Content-Type: application/json" \
  -d '{
    "identity": "doctor-123"
  }'
```

**Expected Response (400 Error):**
```json
{
  "success": false,
  "message": "Identity and room are required"
}
```

### Method 3: Browser Console Testing

Open your browser console (F12) and run:

```javascript
// Test token generation
fetch('http://localhost:5001/api/video/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    identity: 'test-user',
    room: 'consultation-room-1'
  })
})
.then(r => r.json())
.then(data => {
  console.log('✅ Token Response:', data);
  if (data.success && data.token) {
    console.log('Token length:', data.token.length);
  }
})
.catch(err => console.error('❌ Error:', err));
```

### Method 4: Postman/Thunder Client

1. **Create a new POST request**
   - URL: `http://localhost:5001/api/video/token`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "identity": "doctor-123",
       "room": "consultation-room-1"
     }
     ```

2. **Expected Response:**
   - Status: 200 OK
   - Body: `{ "success": true, "token": "..." }`

## 🔍 Verification Checklist

Before testing, ensure:

- [ ] Backend server is running on port 5001
- [ ] MongoDB is connected (check backend logs)
- [ ] Twilio credentials are set in `backend/.env`:
  - `TWILIO_SID`
  - `TWILIO_API_KEY`
  - `TWILIO_API_SECRET`
- [ ] No errors in backend console

## 🐛 Troubleshooting

### Error: "identity is required to be specified in options"
✅ **FIXED** - Identity is now passed in AccessToken constructor

### Error: 404 Not Found
- Check if video routes are registered in `server.js`
- Verify route path: `/api/video/token`

### Error: 500 Internal Server Error
- Check backend console for detailed error
- Verify Twilio credentials in `.env`
- Ensure all environment variables are loaded

### Error: CORS issues
- Check CORS configuration in `server.js`
- Verify frontend origin is allowed

## 📝 Frontend Testing

After backend tests pass, test from frontend:

1. **Navigate to video call page**
2. **Open browser DevTools** (F12)
3. **Check Network tab** for API calls
4. **Look for:**
   - ✅ `POST /api/video/token` returns 200
   - ✅ Response contains `success: true` and `token`
   - ✅ No CORS errors

## 🎯 Success Criteria

Video call is working when:
- ✅ Token endpoint returns valid JWT token
- ✅ Room validation works correctly
- ✅ Frontend can request and receive tokens
- ✅ Video participants can connect to Twilio room
- ✅ Video/audio tracks are displayed

## 📞 Next Steps

If all tests pass:
1. Test actual video call between two users
2. Verify video/audio tracks are working
3. Test room disconnection
4. Test multiple participants

---

**Need Help?** Check backend console logs for detailed error messages.
