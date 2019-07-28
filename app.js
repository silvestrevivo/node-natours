const fs = require('fs');
const morgan = require('morgan');
const express = require('express');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); //make posible to read json data from req.body
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//* URL's
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can port to this endpoint...');
});

//* API
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
  // this is data has to be available always, that's why is synchronous
);

// GET requests
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const tour = tours.find(el => el.id === parseInt(req.params.id, 10));

  // 404 => object not found, not exists in the server
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'The tour with the given ID was not found.',
    });

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet define',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet define',
  });
};

// POST requests
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    // inside the event loop, this has to be asynchronous for non blocking
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      // 201 means created
      res.status(201).json({
        status: 'success',
        data: { tours: newTour },
      });
    }
  );
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet define',
  });
};

// PATCH requests
const updateTour = (req, res) => {
  const tour = tours.find(el => el.id === parseInt(req.params.id, 10));

  // 404 => object not found, not exists in the server
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'The tour with the given ID was not found.',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Data updated />',
    },
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet define',
  });
};

// DELETE requests
const deleteTour = (req, res) => {
  const tour = tours.find(el => el.id === parseInt(req.params.id, 10));

  // 404 => object not found, not exists in the server
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'The tour with the given ID was not found.',
    });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet define',
  });
};

//* REQUESTS
const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const userRouter = express.Router();
app.use('/api/v1/users', userRouter);
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
