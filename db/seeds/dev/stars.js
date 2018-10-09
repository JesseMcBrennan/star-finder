let starsData = [
{
  name: 'OGLE-2016-BLG-1469L b',
  mass: '13.6'
},
{
  name: '11 Com b',
  mass: '19.4'
},
{
  name: '11 Oph b',
  mass: '21.00'
},
{
  name: '11 UMi b',
  mass: '10.5'
},
{
  name: '14 And b',
  mass: '5.33'
}
]

let expoPlanets = [{
  
}]



const createStar = (knex, star) => {
  return knex('stars').insert({
    name: stars.name
  }, id)
  .then(starId => {
    let exoplanetPromises = []

    star.exoplanets.forEach(exoplanet => {
      exoplanetPromises.push(createExoplanet(knex, {
        ...exoplanet,
        star_id: planetId[0]
      })
      )
    });
    return Promise.all(exoplanetPromises)
  })
};

const createExoplanet = (knex, exoplanet) => {
  return knex('exoplanets').insert(exoplanet);
};


exports.seed = function(knex, Promise) {
  return knex('stars').del()
    .then(() => knex('stars').del())
    .then(() => {
      let starPromises = [];

      starsData.forEach(star => {
        starPromises.push(createStar(knex, project));
      });
      return Promise.all(starPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
