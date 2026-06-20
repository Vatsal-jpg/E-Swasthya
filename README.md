


# E-Swastya Telemedicine Platform

## Overview

E-Swastya is a full-stack telemedicine platform that connects patients, doctors, and administrators through secure video consultations, appointment booking, digital prescriptions, and emergency support. The platform includes OTP-based patient login, doctor credential verification, AI-powered symptom guidance, nearby clinic discovery, and SOS alerting.

## Features

- Patient OTP login and registration
- Doctor registration with license and ID verification
- Role-based dashboard flows for patients, doctors, and admins
- Appointment booking and rescheduling
- Twilio-powered real-time video consultations
- Digital prescription creation and patient report access
- AI symptom analysis backend integration
- Nearby clinic discovery with OpenStreetMap
- Emergency SOS alert system with nearby facility lookup
- Feedback submission flow
- Demo data generation endpoint for testing

## Architecture

### Frontend
- React + TypeScript
- Vite build system
- Tailwind CSS and Radix UI
- React Router for navigation
- React Query for async data handling
- Twilio Video integration via custom hook

### Backend
- Node.js + Express
- MongoDB with Mongoose schemas
- JWT authentication and role middleware
- Modular controllers and routes
- Twilio token generation and SMS support
- Python AI integration for medical diagnosis

### Data Model
- Doctor: credentialed provider data and verification status
- Patient: phone-first identity, profile, and OTP lifecycle
- Appointment: doctor/patient linkage, date, time, queue
- Prescription: diagnosis, medicines, tests, follow-up advice
- Feedback: user ratings and messages

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Express
- MongoDB
- Mongoose
- JWT
- Twilio Video
- Twilio SMS
- Python
- Azure DXGPT
- Leaflet / OpenStreetMap

## Installation

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Environment Variables

### Backend
Create a `.env` file with:
```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
TWILIO_SID=<twilio-account-sid>
TWILIO_API_KEY=<twilio-api-key>
TWILIO_API_SECRET=<twilio-api-secret>
TWILIO_AUTH_TOKEN=<twilio-auth-token>
TWILIO_PHONE=<twilio-phone-number>
```

### Frontend
Create `.env` or `.env.local` with:
```env
VITE_API_URL=http://localhost:5001/api
```

## Running Locally

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

## Deployment

- Backend can be deployed to any Node.js hosting service
- Frontend can be deployed as a static Vite app
- MongoDB should be hosted using Atlas or managed database
- Twilio credentials and environment variables must be configured in production

## Folder Structure

```text
backend/
  controllers/
  middlewares/
  models/
  routes/
  services/
  config/
  server.js
frontend/
  src/
    components/
    hooks/
    pages/
    services/
    types/
    utils/
  package.json
model/
  ai.py
  description.csv
  diets.csv
  medications.csv
  precautions_df.csv
  workout_df.csv
```

## Future Enhancements

- complete AI frontend integration
- add persistent chat during consultations
- support appointment availability and calendar conflicts
- add backend access logging and analytics
- implement Docker deployment
- add automated test coverage and CI/CD
- store admin users in database with RBAC
