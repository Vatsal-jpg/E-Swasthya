# 🧪 Setting Up Test Data for Appointments

To test the reschedule feature, you need to create appointments in MongoDB with valid ObjectIds.

## Option 1: Using MongoDB Compass or MongoDB Shell

1. Connect to your MongoDB database (`thakur-hack`)
2. Navigate to the `appointments` collection
3. Create a new document with this structure:

```json
{
  "patient": ObjectId("507f1f77bcf86cd799439011"),  // Replace with actual patient ID
  "doctor": ObjectId("507f1f77bcf86cd799439012"),  // Replace with actual doctor ID
  "date": "2025-01-28",
  "timeSlot": "10:00",
  "status": "booked",
  "reason": "Follow-up consultation"
}
```

## Option 2: Get Real IDs from Your Database

First, find the actual patient and doctor IDs:

```javascript
// In MongoDB shell or Compass
use thakur-hack

// Get patient ID
db.patients.findOne({}, { _id: 1 })

// Get doctor ID
db.doctors.findOne({}, { _id: 1 })
```

Then create an appointment using those IDs.

## Option 3: Create via API (if booking endpoint exists)

Use the booking API endpoint to create an appointment, which will automatically use valid ObjectIds.

## Option 4: Quick Test Script

Create a file `backend/scripts/createTestAppointment.js`:

```javascript
import mongoose from 'mongoose';
import Appointment from '../models/appointment.model.js';
import Patient from '../models/patient.model.js';
import Doctor from '../models/doctor.model.js';
import dotenv from 'dotenv';

dotenv.config();

async function createTestAppointment() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get first patient and doctor
    const patient = await Patient.findOne();
    const doctor = await Doctor.findOne();

    if (!patient || !doctor) {
      console.log('❌ No patient or doctor found. Please create them first.');
      process.exit(1);
    }

    const appointment = new Appointment({
      patient: patient._id,
      doctor: doctor._id,
      date: '2025-01-28',
      timeSlot: '10:00',
      status: 'booked',
      reason: 'Test appointment for reschedule feature'
    });

    await appointment.save();
    console.log('✅ Test appointment created:', appointment._id);
    console.log('Patient ID:', patient._id);
    console.log('Doctor ID:', doctor._id);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestAppointment();
```

Run it:
```bash
cd backend
node scripts/createTestAppointment.js
```

## Update Frontend to Use Real IDs

Once you have the real patient ID, update `frontend/src/pages/patient/FollowUps.tsx`:

```typescript
// Replace this line:
const patientId = 'p1';

// With the actual MongoDB ObjectId:
const patientId = '507f1f77bcf86cd799439011'; // Your actual patient ID
```

Similarly for doctor calendar in `frontend/src/pages/doctor/DoctorCalendar.tsx`:

```typescript
// Replace:
const doctorId = 'd1';

// With:
const doctorId = '507f1f77bcf86cd799439012'; // Your actual doctor ID
```

## Current Behavior

With the fix I made:
- ✅ Invalid IDs (like 'p1') will return an empty array (no error)
- ✅ The page will load successfully but show "No upcoming appointments"
- ✅ Once you use valid ObjectIds and create appointments, they will appear
