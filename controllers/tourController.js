const fs = require('fs');

//* API
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  // this is data has to be available always, that's why is synchronous
);

//* Help functions
let tour;
exports.checkID = (req, res, next, val) => {
  tour = tours.find(el => el.id === parseInt(req.params.id, 10));

  // 404 => object not found, not exists in the server
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'The tour with the given ID was not found.',
    });
  next();
};

// GET requests
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

// POST requests
exports.createTour = (req, res) => {
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

// PATCH requests
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Data updated />',
    },
  });
};

// DELETE requests
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
