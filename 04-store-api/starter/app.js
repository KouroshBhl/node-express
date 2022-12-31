require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/error-handler');
const errorMiddleware = require('./middleware/error-handler');

//! Middleware
app.use(express.json());

//! Routes
app.get('/', (req, res) => {
  res.send('<h1>Store API </h1><a href="/api/v1/products"> Go to product </a>');
});

app.use('/api/v1/products', productRouter);

//! Custom middlewares

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to port ${port} ...`));
  } catch (error) {
    console.log('Can not run server');
  }
};
start();
