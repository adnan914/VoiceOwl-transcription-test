# VoiceOwl Transcription System

A full-stack audio transcription platform with user authentication, built with Node.js/Express (backend) and Next.js/React (frontend).

---

## Overview
- **Backend:** RESTful API for authentication, password reset, and audio transcription (Node.js, Express, MongoDB).
- **Frontend:** Modern web client for user signup/login, audio upload, and viewing transcriptions (Next.js, React, Redux).

---

## How It Works
- The **frontend** communicates with the **backend** via HTTP API calls (see `src/utils/config.ts` in frontend for API URL).
- Users can sign up, log in, upload audio for transcription, and view their transcription history.
- Authentication is handled via JWT tokens (access/refresh) stored in cookies.

---

## Prerequisites
- **Node.js** v18+
- **npm** v9+
- **MongoDB** (for backend)

---

## Running Locally (Development)

### 1. Start the Backend
```bash
cd backend
cp .env.development.example .env.development # create and fill in your env file
npm install
npm run start:dev
```
- The backend will run on [http://localhost:3001](http://localhost:3001)

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
- The frontend will run on [http://localhost:3000](http://localhost:3000)
- Make sure the API URL in `frontend/src/utils/config.ts` matches your backend URL.

---

## Running in Production
- Build and start the backend: `npm run build && npm run start:prod` (in backend)
- Build and start the frontend: `npm run build && npm start` (in frontend)
- Set environment variables for production as needed.

---

## System Structure
```
voiceowl-transcription-system/
  backend/    # Node.js/Express API
  frontend/   # Next.js/React web client
```

---

## License
MIT
