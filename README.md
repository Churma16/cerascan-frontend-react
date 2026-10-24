# CeraScan: React Frontend Application

[![React](https://img.shields.io/badge/React-v19.x-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-v6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

The web interface for CeraScan. Users can upload ceramic tile images, watch defect classifications update in real time, and inspect historical scan records.

---

## Capabilities

* **Tile Inspection**: Upload surface photos to trigger defect detection and view confidence scores.
* **Live Status**: Receives real-time scan progress from the backend using Socket.io and Server-Sent Events (SSE).
* **Scan History**: Displays defect trends and past inspection records with interactive charts.
* **User Authentication**: Client-side protected routes for signed-in operators and visitors.

---

## Tech Stack

* **Framework**: React 19, Vite
* **Routing**: React Router v7
* **Data Fetching**: TanStack Query (React Query), Axios
* **UI and Styling**: Tailwind CSS v4, Radix UI, Framer Motion, Lucide Icons
* **Real-time Client**: Socket.io Client

---

## Getting Started

### Prerequisites

* Node.js 18 or higher
* Running CeraScan Express API gateway

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   VITE_PROD=false
   VITE_WEB_SOCKET_URL="http://localhost:5002"
   VITE_BACKEND_URL_DEV="http://localhost:5002/api"
   VITE_BACKEND_STORAGE_URL_DEV="http://localhost:5002/storage"
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

The application runs locally at `http://localhost:3002` (or the port Vite prints in your terminal).

---

## Directory Layout

* `src/api/`: Axios API clients for communicating with the Express gateway.
* `src/features/`: Feature modules for authentication, tile scanning, and dashboard views.
* `src/hooks/`: Custom React hooks, including TanStack Query hooks.
* `src/components/`: Reusable UI elements built with Radix UI and Tailwind CSS.
* `src/layouts/`: Page layouts for public and authenticated views.

---

## License

This project is licensed under the [MIT License](LICENSE).
