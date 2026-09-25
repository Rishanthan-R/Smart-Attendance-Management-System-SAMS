import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'OK', message: 'SAMS Backend API is running', timestamp: new Date().toISOString() });
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'SAMS Backend API is running', timestamp: new Date().toISOString() });
});

import authRoutes from './routes/auth.routes';
app.use('/api/auth', authRoutes);
import adminRoutes from './routes/admin.routes';
app.use('/api/admin', adminRoutes);
import moduleRoutes from './routes/module.routes';
import sessionRoutes from './routes/session.routes';
app.use('/api', moduleRoutes);
app.use('/api/sessions', sessionRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`✅  SAMS Backend running on http://localhost:${PORT}`);
  });
}
export default app;