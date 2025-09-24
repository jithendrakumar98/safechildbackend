import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import childRouter from "./ChildSafeRouter.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.get('/', (req, res) => {
  res.send('Safe Child API is running');
});
app.use('/child', childRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
