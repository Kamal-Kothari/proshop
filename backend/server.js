import express from 'express';
import path from 'path';
import products from './data/products.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFoundErr, errorHandler } from './middleware/errorHandler.js';
import { url } from 'inspector';
import cookieParser from 'cookie-parser';

connectDB();

const app = express();

//body parser
app.use(express.json())
// form data parser
app.use(express.urlencoded({ extended: true }));

//read cookie 
app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Api is running bro...');
// });

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// app.get('/api/config/paypal', (req, res) => {
//     res.send(process.env.PAYPAL_CLIENT_ID);
// })

app.get('/api/config/paypal', (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();  // Gets the absolute path of the current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));  // Serve uploaded files statically
// Files in /uploads can now be accessed via http://localhost:5000/uploads/{filename}.
//http://localhost:5000/uploads/image-1738132611001.jpg

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));   
    // When a request comes in for a file (for example, /static/js/main.js), Express will look for that file inside the frontend/build folder.
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
    //This route handles all GET requests that are not matched by any other server-side routes.

} else {
    app.get('/', (req, res) => {
        res.send('Api is running bro...');
    });
}
  

app.use(notFoundErr);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})