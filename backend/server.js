import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFoundErr, errorHandler } from './middleware/errorHandler.js';

connectDB();

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Api is running bro...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFoundErr);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// const PORT = 5000;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})