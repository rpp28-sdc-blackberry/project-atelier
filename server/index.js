const express = require('express');

const app = express();
const port = 8080;

app.use(express.static('public'));

app.post('/api/posts', (req, res) => {
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
