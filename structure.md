# Project Structure

```
VoiceCooking/ (root directory)
├── Backend/ (Node.js, Express.js, Prisma)
│   ├── .env (Environment variables)
│   ├── index.js (Entry point)
│   ├── server.js (Express server setup)
│   ├── package.json (Dependencies)
│   ├── package-lock.json
│   ├── prisma/ (Prisma ORM files)
│   │   ├── schema.prisma (Database schema)
│   ├── Features/
│   │   ├── InternApi/ (Existing API - to be refactored)
│   │   │   ├── internApi.js
│   │   ├── auth/ (Authentication logic)
│   │   ├── googleDrive/ (Google Drive API integration)
│   │   ├── gemini/ (Gemini API integration)
│   │   ├── trial/ (Free trial management)
│   ├── models/ (Database models)
│   ├── utils/ (Utility functions)
├── Voice_Cooking/ (React frontend)
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── vite.svg
│   ├── src/
│   │   ├── App.jsx (Main application component)
│   │   ├── components/ (React components)
│   │   │   ├── Auth/ (Authentication components)
│   │   │   ├── GoogleDrive/ (Google Drive components)
│   │   │   ├── Gemini/ (Gemini components)
│   │   │   ├── QuestionPaper/ (Question paper display)
│   │   ├── pages/ (React pages/routes)
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── assets/

## Backend Details

*   **Node.js, Express.js:**  Handles API requests, routing, and middleware.
*   **Prisma ORM:**  Provides a type-safe way to interact with the PostgreSQL database.
*   **.env:** Stores environment variables (API keys, database credentials).
*   **Features/:** Contains modular code for different functionalities.
    *   **auth/:**  Handles user authentication (login, registration).
    *   **googleDrive/:**  Integrates with the Google Drive API.
    *   **gemini/:**  Integrates with the Gemini API for question generation.
    *   **trial/:** Manages the free trial system.
*   **models/:** Defines the data models for the database (e.g., User, QuestionPaper).
*   **utils/:** Contains utility functions (e.g., error handling, logging).

## Frontend Details

*   **React:**  A JavaScript library for building user interfaces.
*   **Vite:**  A build tool that provides a fast development experience.
*   **src/:** Contains the React application code.
    *   **App.jsx:** The main application component.
    *   **components/:** Reusable React components.
        *   **Auth/:** Authentication-related components (Login, Register).
        *   **GoogleDrive/:** Components for interacting with Google Drive.
        *   **Gemini/:** Components for generating question papers using the Gemini API.
        *   **QuestionPaper/:** Components for displaying and interacting with question papers.
    *   **pages/:** React components representing different pages or routes.
        *   **Login.jsx:** Login page.
        *   **Dashboard.jsx:** Main dashboard after login.