let starsData = [
{
  name: 'OGLE-2016-BLG-1469L',
  mass: '271.945750016'
},
{
  name: '11 Com',
  mass: '185.1791667'
},
{
  name: '11 Oph',
  mass: '245.6041667'
},
{
  name: '11 UMi',
  mass: '229.275'
},
{
  name: '14 And',
  mass: '352.8208333'
},
{
  name: '14 And b',
  mass: '242.5958333'
},
{
  name: '14 Her b',
  mass: '295.4625'
},
{
  name: '16 Cyg B b',
  mass: '314.6083333'
},
{
  name: '18 Del b',
  mass: '10.3'
},
{
  name: '1 I/2017 U1',
  mass: ''
},
{
  name: '1RXS',
  mass: '14'
},
{
  name: '1SWASP J1407 b',
  mass: '20'
},
{
  name: '24 Sex b',
  mass: '1.99'
},
{
  name: '24 Sex c',
  mass: '0.86'
},
{
  name: '2M 0103-55 (AB) b',
  mass: '13'
},
{
  name: '2M 0122-24 b',
  mass: '20'
},
{
  name: '2M 0219-39 b',
  mass: '13.9'
},
{
  name: '2M 0746+20 b',
  mass: '30'
},
{
  name: '2M 0441+23 b',
  mass: '7.5'
},
{
  name: '2M 1207-39',
  mass: '24'
},
{
  name: '2M 1207-39 b',
  mass: '4'
},
{
  name: '2M 1938+46 b',
  mass: '1.9'
},
{
  name: '2M 2140+16 b',
  mass: '20'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
},
{
  name: '2M J2126-81 b',
  mass: '13.3'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
}
]

let exoplanetsData = [
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
},
{
  name: '14 Her b',
  mass: '4.46'
},
{
  name: '16 Cyg B b',
  mass: '1.68'
},
{
  name: '18 Del b',
  mass: '10.3'
},
{
  name: '1 I/2017 U1',
  mass: ''
},
{
  name: '1RXS',
  mass: '14'
},
{
  name: '1SWASP J1407 b',
  mass: '20'
},
{
  name: '24 Sex b',
  mass: '1.99'
},
{
  name: '24 Sex c',
  mass: '0.86'
},
{
  name: '2M 0103-55 (AB) b',
  mass: '13'
},
{
  name: '2M 0122-24 b',
  mass: '20'
},
{
  name: '2M 0219-39 b',
  mass: '13.9'
},
{
  name: '2M 0746+20 b',
  mass: '30'
},
{
  name: '2M 0441+23 b',
  mass: '7.5'
},
{
  name: '2M 1207-39',
  mass: '24'
},
{
  name: '2M 1207-39 b',
  mass: '4'
},
{
  name: '2M 1938+46 b',
  mass: '1.9'
},
{
  name: '2M 2140+16 b',
  mass: '20'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
},
{
  name: '2M J2126-81 b',
  mass: '13.3'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
},
{
  name: '2M 2236+4751 b',
  mass: '12.5'
}

]




const createStar = (knex, star) => {
  return knex('stars').insert({
    name: star.name,
    mass: star.mass
  }, 'id')
  .then(starId => {
    let exoplanetPromises = []

    exoplanetsData.forEach(exoplanet => {
      exoplanetPromises.push(createExoplanet(knex, {
        ...exoplanet,
        star_id: starId[0]
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
  return knex('exoplanets').del()
    .then(() => knex('stars').del())
    .then(() => {
      let starPromises = [];

      starsData.forEach(star => {
        starPromises.push(createStar(knex, star));
      });
      return Promise.all(starPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
