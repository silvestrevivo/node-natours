const fs = require('fs');
const express = require('express');

const app = express();

// Middlewares
app.use(express.json()); //make posible to read json data from req.body

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
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

// POST requests
app.post('/api/v1/tours', (req, res) => {
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
});

// PATCH requests
app.patch('/api/v1/tours/:id', (req, res) => {
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
});

// DELETE requests
app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
