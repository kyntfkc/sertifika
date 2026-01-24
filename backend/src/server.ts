import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import urunRoutes from './routes/urunRoutes.js';
import { testConnection } from './config/db.js';
import { runMigration } from './config/migrate.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/urunler', urunRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
async function startServer() {
  const dbConnected = await testConnection();
  if (!dbConnected) {
    console.error('Database connection failed. Please check your DATABASE_URL.');
    process.exit(1);
  }

  // Run migrations on startup
  console.log('Running database migrations...');
  await runMigration();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
