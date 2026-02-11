# 🚀 How to Run the Telemedicine Application

This guide will help you set up and run both the backend and frontend servers.

## 📋 Prerequisites

Before starting, make sure you have the following installed:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
3. **npm** (comes with Node.js) or **yarn**

## 🔧 Setup Instructions

### Step 1: Install Dependencies

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

#### Backend (.env file)

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add the following to `backend/.env`:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/thakur-hack
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/thakur-hack

# Server Port (optional, defaults to 5001)
PORT=5001

# JWT Secret (for authentication)
JWT_SECRET=your-secret-key-here

# Twilio Credentials (for video calls - optional)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_API_KEY=your-api-key
TWILIO_API_SECRET=your-api-secret
```

#### Frontend (.env file)

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
touch .env
```

Add the following to `frontend/.env`:

```env
# Backend API URL
VITE_API_URL=http://localhost:5001/api
```

### Step 3: Start MongoDB

#### Option A: Local MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
# MongoDB should start automatically as a service
# Or start manually:
net start MongoDB
```

**macOS (using Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
If using MongoDB Atlas, just use the connection string in your `.env` file. No local installation needed.

### Step 4: Run the Application

You need to run both backend and frontend servers. Open **two separate terminal windows/tabs**.

#### Terminal 1: Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 E-Swastya Backend Server Started
📍 Local:     http://localhost:5001
📍 Network:   http://YOUR_IP:5001
```

#### Terminal 2: Frontend Server

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🌐 Access the Application

1. **Frontend (Patient/Doctor Portal):**
   - Open your browser and go to: `http://localhost:5173`

2. **Backend API:**
   - Health Check: `http://localhost:5001/api/health`
   - Appointments API: `http://localhost:5001/api/appointments`

## 🧪 Testing the Reschedule Feature

### 1. Create Test Data (Optional)

You can create appointments using the booking API or directly in MongoDB:

```javascript
// In MongoDB shell or Compass
use thakur-hack

db.appointments.insertOne({
  patient: ObjectId("..."), // Use actual patient ID
  doctor: ObjectId("..."),  // Use actual doctor ID
  date: "2025-01-28",
  timeSlot: "10:00",
  status: "booked"
})
```

### 2. Test Patient Reschedule

1. Navigate to: `http://localhost:5173/patient/follow-ups`
2. Click "Reschedule" button
3. Select a new date and time
4. Click "Confirm Reschedule"
5. You should see a success message

### 3. Test Doctor Calendar

1. Navigate to: `http://localhost:5173/doctor/calendar`
2. The calendar should display appointments from the backend
3. Click "Refresh" button to reload appointments
4. After a patient reschedules, click refresh to see the updated appointment

## 🔍 API Endpoints

### Get Appointments
```bash
# Get doctor's appointments
GET http://localhost:5001/api/appointments?doctorId=DOCTOR_ID

# Get patient's appointments
GET http://localhost:5001/api/appointments?patientId=PATIENT_ID
```

### Reschedule Appointment
```bash
PUT http://localhost:5001/api/appointments/APPOINTMENT_ID/reschedule
Content-Type: application/json

{
  "date": "2025-01-30",
  "time": "14:00"
}
```

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```
❌ MongoDB Error: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running. Check with:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl status mongod
```

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5001
```
**Solution:** Change the PORT in `backend/.env` or kill the process using port 5001.

### Frontend Issues

**API Connection Error:**
```
Failed to fetch appointments
```
**Solution:** 
1. Make sure backend is running on port 5001
2. Check `VITE_API_URL` in `frontend/.env`
3. Check CORS settings in `backend/server.js`

**Module Not Found:**
```
Cannot find module '@/services/appointment.service'
```
**Solution:** Make sure you ran `npm install` in the frontend directory.

## 📝 Notes

- **Development Mode:** Backend uses `nodemon` for auto-restart on file changes
- **Hot Reload:** Frontend uses Vite's HMR (Hot Module Replacement)
- **Network Access:** The backend is configured to accept connections from other devices on the same network
- **Authentication:** Currently using placeholder IDs (`d1`, `p1`). In production, get these from auth context.

## 🎯 Quick Start (TL;DR)

```bash
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 2. Create .env files (see Step 2 above)

# 3. Start MongoDB

# 4. Run servers (in separate terminals)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev

# 5. Open http://localhost:5173
```

## 📚 Additional Resources

- MongoDB Documentation: https://docs.mongodb.com/
- Node.js Documentation: https://nodejs.org/docs/
- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
