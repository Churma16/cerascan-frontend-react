# CeraScan Dashboard

[![React Version](https://img.shields.io/badge/React-v18.x-61DAFB?logo=react&logoColor=white)](https://react.dev) [![Build Tool](https://img.shields.io/badge/Vite-v5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev) [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

The responsive web dashboard for CeraScan. It allows users to monitor real-time ceramic tile defect detection results, manage quality control workflows, and view analytics seamlessly.

---

## Key Features

*   **Real-time Monitoring**:
    *   Instantaneous updates of scanning results pushed directly to the UI via WebSockets (Socket.io) and Server-Sent Events (SSE).
*   **Responsive Dashboard**:
    *   Sleek and professional interface optimized for both desktop and mobile viewing.
*   **Authentication**:
    *   Secure client-side route protection and user session management.

---

## Tech Stack & Libraries

*   **Framework/Core**: React / Vite
*   **Styling**: Tailwind CSS
*   **State Management / Fetching**: TanStack Query / Axios
*   **Libraries**: Socket.io-client, Server-Sent Events (SSE)

---

## Installation & Setup

### Method 1: Local Development Setup

#### Prerequisites
*   Node.js >= 16.x
*   npm or yarn

#### Steps
1.  **Clone and Navigate**:
    ```bash
    git clone [repository-url]
    cd vgg-frontend-react
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Configuration**:
    Create `.env` based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
5.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## Acknowledgements

Special thanks and appreciation to the teams and contributors involved in creating this interactive interface.

---

## Author

**Churma16**

---

## License

This project is licensed under the [MIT License](LICENSE).
