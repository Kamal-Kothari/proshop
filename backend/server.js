import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Api is running bro...');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
// const PORT = 5000;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})