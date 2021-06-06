const express = require('express');

const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(express.json());

app.all('*', (req, res) => {
  console.log('req.method:', req.method);
  console.log('req.url', req.url);
  console.log('req.body', req.body);
  res.status(200).send('got your request');
});
// // this get route is only used for an example test...
// app.get('/', (req, res) => {
//   res.sendStatus(200);
// });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
