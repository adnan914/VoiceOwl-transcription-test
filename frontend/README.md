# VoiceOwl Transcription Frontend

A modern web client for VoiceOwl, built with Next.js, React, Redux Toolkit, and TailwindCSS. Provides user authentication, audio transcription upload, and viewing of transcription history.

---

## Tech Stack
- Next.js (App Router)
- React 19
- Redux Toolkit
- TypeScript
- TailwindCSS
- Axios

---

## Prerequisites
- **Node.js** v18+
- **npm** v9+ (or yarn/pnpm)

---

## Installation
```bash
# Clone the repository (if not already)
git clone <repo-url>
cd frontend

# Install dependencies
npm install
```

---

## Environment Variables
The backend API URL is currently set in `src/utils/config.ts`:
```ts
export const config = {
  API_URL: "http://localhost:3001/api/v1/"
}
```
To change the backend URL, edit this file. (For production, update to your deployed backend URL.)

---

## Running the Project

### Development
```bash
npm run dev
```
- Runs the app at [http://localhost:3000]

### Production
```bash
npm run build
npm start
```
- Builds and starts the optimized production server.

---

## Build & Deployment
- **Build:** `npm run build`
- **Start:** `npm start`
- **Deploy:** You can deploy to Vercel, Netlify, or any platform supporting Next.js.

---

## Common Issues & Troubleshooting
- **API not working:** Ensure the backend is running and `API_URL` is correct.
- **Port in use:** Change the port in `env` or stop the conflicting process.
- **CORS errors:** Make sure backend CORS is configured to allow frontend origin.

---

## Scripts
- `npm run dev` — Start in development mode
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint

---

## License
MIT
