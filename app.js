const morgan = require('morgan');
const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); //make posible to read json data from req.body
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//* ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//* URL's
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can port to this endpoint...');
});

module.exports = app;
