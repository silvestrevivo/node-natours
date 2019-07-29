const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Conect the .env file with our app
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

//* SERVER
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
