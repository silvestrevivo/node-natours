const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Connect the .env file with our app
dotenv.config({ path: './config.env' });

const app = require('./app.js');

// Connecting to MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    require: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

//* SERVER
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
