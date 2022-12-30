require('dotenv').config();
const connectionDB = require('./db/connect');
const express = require('express');
const taskRouter = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();
const port = 3000;

// !Middleware
app.use(express.json());
app.use(express.static('./public'));

//! Routes
app.get('/', (req, res) => {
  res.send('Welcome to app');
});

app.use('/api/v1/tasks', taskRouter);
app.use(notFound);
app.use(errorHandler);

//! Listen PORT
app.listen(port, () => {
  console.log('Listening for 3000 port');
});

const start = async function () {
  try {
    await connectionDB(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};
start();
