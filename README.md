# Arham Tech Zone - Portfolio

A modern, full-stack developer portfolio and tech blog built with React, Vite, Tailwind CSS, and an Express.js backend API.

## Features

- **Modern UI/UX**: Built with React and styled beautifully using Tailwind CSS v3 with a custom dark-mode-first cyber aesthetic.
- **Dynamic Tools**: Includes a Password Generator, QR Code Generator, and Age Calculator powered by custom Express API endpoints.
- **Tech Blog**: A dedicated blog section with category tagging, filtering, and dynamic content rendering.
- **Integrated Backend**: An Express.js backend runs concurrently with the Vite dev server for a seamless full-stack development experience.
- **Fully Responsive**: Optimized for desktops, tablets, and mobile devices.

## Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS 3
- **Backend**: Node.js, Express 5, CORS
- **Tooling**: npm-run-all for concurrent dev environments, ESLint for code quality.

## Project Structure

Everything is consolidated into a single project root for simplicity:
- `/src` - React frontend source code and components.
- `/data` - Contains JSON datasets (like `blogs.json`) for the backend.
- `server.js` - The Express API backend and production static file server.
- `tailwind.config.js` - Custom design tokens, colors, animations, and typography.

## Getting Started

1. **Install Dependencies**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   This single command starts both the Vite React frontend (with Hot Module Replacement) and the Express backend API simultaneously:
   ```bash
   npm run dev
   ```
   - Frontend runs on: `http://localhost:5173`
   - Backend API runs on: `http://localhost:5000`

3. **Build for Production**
   To create an optimized production build of the React app:
   ```bash
   npm run build
   ```
   The build output will be placed in the `/dist` directory. You can then run `npm start` to have the Express backend serve the production build alongside the API.
