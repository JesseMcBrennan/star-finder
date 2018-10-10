const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static('public'));
app.locals.title = 'Star-Finder';


app.get('/', (request, response) => {
  response.send(app.locals.title);
});

app.get('/api/v1/stars', (request, response) => {
  database('stars').select()
    .then((stars) => {
      response.status(200).json(stars);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/exoplanets', (request, response) => {
  database('exoplanets').select()
    .then((exoplanets) => {
      response.status(200).json(exoplanets);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});
