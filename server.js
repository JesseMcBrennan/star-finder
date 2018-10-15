const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const name = '11 Com'
const cors = require('cors');

app.use(cors())
app.set('port', process.env.PORT || 3009);
app.use(bodyParser.json());
// app.use(express.static('public/'));
app.locals.title = 'Star-Finder is deploying successfully';


app.get('/', (request, response) => {
  response.status(200).json(app.locals.title);
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

app.get('/api/v1/stars/:id', (request, response) => {
  database('stars').where('id', request.params.id).select()
  .then(stars => {
    if(stars.length) {
      response.status(200).json(stars);
    } else {
      response.status(404).json({
        error: `Could not find star with id ${request.params.id}`
      });
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

// app.get('/api/v1/stars', (request, response) => {
//   database('stars').where('id', request.params.id).select()
//   .then(stars => {
//     if(stars.length) {
//       response.status(200).json(stars);
//     } else {
//       response.status(404).json({
//         error: `Could not find star with id ${request.params.id}`
//       });
//     }
//   })
//   .catch(error => {
//     response.status(500).json({ error })
//   })
// })

app.get('/api/v1/exoplanets/:id', (request, response) => {
  database('exoplanets').where('id', request.params.id).select()
  .then(exoplanets => {
    if(exoplanets.length) {
      response.status(200).json(exoplanets);
    } else {
      response.status(404).json({
        error: `Could not find an exoplanet with id ${request.params.id}`
      });
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.delete('/api/v1/stars/:id', (request, response) => {
  database('stars').where('id', request.params.id).select()
  .then(stars => {
    if(stars.length) {
      response.status(200).json(stars) 
    } else {
      response.status(404).json({
        error: `Could not find star with id ${request.params.id}`
      });
    }
  })
  .catch(error => {
    response.status(500).json({ error });
  })
});

app.post('/api/v1/stars', (request, response) => {
  const star = request.body;

  for (let requiredParam of ['name', 'mass']) {
    if(!star[requiredParam]) {
      response.status(422).json({ error: 'You are missing a required parameter'});
    } else {
      // response.send({ name: })
      response.status(201).json({ message: 'Star successfully added'})
    }
  }
})

app.delete('/api/v1/exoplanets/:id', (request, response) => {
  database('exoplanets').where('id', request.params.id).del()
  .then(exoplanets => {
    if(exoplanets.length) {
      response.status(200).json(exoplanets) 
    } else {
      response.status(404).json({
        error: `Could not find exoplanets with id ${request.params.id}`
      });
    }
  })
  .catch(error => {
    response.status(500).json({ error });
  })
});

app.post('/api/v1/exoplanets', (request, response) => {
  const exoplanet = request.body;

  for (let requiredParam of ['name', 'mass']) {
    if(!exoplanet[requiredParam]) {
      response.status(422).json({ error: 'You are missing a required parameter'});
    } else {
      response.status(201).json({ message: 'Exoplanet successfully added'})
    }
  }
})

app.put('/api/v1/stars/:id', (request, response) => {
  database('stars').where('id', request.params.id).select()
  .then(stars => {
    if(stars.length) {
      response.status(205).json({ message: 'Star successfully replaced'})
    } else {
      response.status(404).json({
        error: `Could not find star with id ${request.params.id}`
      })
    }
  })
})

app.put('/api/v1/exoplanets/:id', (request, response) => {
  database('exoplanets').where('id', request.params.id).select()
  .then(exoplanets => {
    if(exoplanets.length) {
      response.status(205).json({ message: 'Exoplanet successfully replaced'})
    } else {
      response.status(404).json({
        error: `Could not find exoplanet with name ${request.params.id}`
      })
    }
  })
})

app.listen(app.get('port'), () => {
  console.log('Express intro running on localhost:3000');
});

module.exports = {app, database};