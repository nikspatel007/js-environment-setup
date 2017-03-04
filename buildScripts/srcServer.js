import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function (req, res) {
  //Hard coding for simplicity. Pretend this hits a realdatabase.
  res.json([{
      "id": 1,
      "firstName": "Nik",
      "lastName": "Patel",
      "email": "nikspatel007@gmail.com"
    },
    {
      "id": 2,
      "firstName": "John",
      "lastName": "Smith",
      "email": "johnsmith@test.com"
    },
    {
      "id": 3,
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "janedoe@test.com"
    },
  ])
})



app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
