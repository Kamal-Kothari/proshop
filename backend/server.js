import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFoundErr, errorHandler } from './middleware/errorHandler.js';
import { url } from 'inspector';
import cookieParser from 'cookie-parser';

connectDB();

const app = express();

//body parser
app.use(express.json())
// form data parser
app.use(express.urlencoded({extended: true}));

//read cookie 
app.use(cookieParser());

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