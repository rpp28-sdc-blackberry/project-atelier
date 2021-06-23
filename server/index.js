const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const queryAPI = require('./atelier.js');
const uploadPhotoToCloudinary = require('./cloudinary.js');
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', (req, res) => {
  if (req.url === '/review/image') {
    uploadPhotoToCloudinary(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    queryAPI(req.method, req.url, req.body)
      .then((response) => {
        let { statusCode } = response.request.res;
        res.status(statusCode).send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});