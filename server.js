import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import app from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// Serve static assets from Vite build output directory
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Fallback: send index.html for any unhandled routes
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀  Arham Tech Zone  →  http://localhost:${PORT}`);
  console.log(`📡  API             →  http://localhost:${PORT}/api`);
  console.log(`💚  Health          →  http://localhost:${PORT}/api/health\n`);
});
