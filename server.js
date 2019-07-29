const dotenv = require('dotenv');
// Conect the .env file with our app
dotenv.config({ path: './config.env' });

const app = require('./app.js');

//* SERVER
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
