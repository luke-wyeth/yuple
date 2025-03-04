import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URL;

// Import the mongoose module
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(uri);
}

// Express
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// Routes
import userRouter from './routes/users.js';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

app.use('/user', userRouter);
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/test", (req, res) => res.json({ hello: 'hello world!2' }));

app.listen(3000, () => console.log("Server ready on port 3000."));

// If needed to export app for testing or other purposes
export default app;
