const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can port to this endpoint...');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
