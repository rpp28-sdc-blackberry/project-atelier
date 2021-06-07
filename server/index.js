const express = require('express');
const app = express();
const port = 8080;
const queryAPI = require('./atelier.js');
app.use(express.static('public'));
app.use(express.json());

app.all('*', (req, res) => {

  // console.log('req.method:', req.method);
  // console.log('req.url', req.url);
  // console.log('req.body', req.body);

  queryAPI(req.method, req.url)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
