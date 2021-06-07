const express = require('express');
const app = express();
const port = 8080;
const queryAPI = require('./atelier.js');
app.use(express.static('public'));
app.use(express.json());

app.all('*', (req, res) => {

  queryAPI(req.method, req.url, req.body)
    .then((response) => {
      let { statusCode } = response.request.res;
      res.status(statusCode).send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });

});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
