import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check Route ──────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'SAMS Backend API is running',
    timestamp: new Date().toISOString(),
  });
});

// ── TODO: Mount Routes ──────────────────────────────────────────
// import authRoutes from './routes/auth.routes';
// import adminRoutes from './routes/admin.routes';
// import lecturerRoutes from './routes/lecturer.routes';
// import studentRoutes from './routes/student.routes';
//
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/lecturer', lecturerRoutes);
// app.use('/api/student', studentRoutes);

// ── Start Server ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  SAMS Backend running on http://localhost:${PORT}`);
});

export default app;
