const Nightmare = require('nightmare');
const nightmare = new Nightmare( {show: true} );
const fs = require('fs') 

nightmare 
  .goto('https://www.kaggle.com/eduardowoj/exoplanets-database')
  .wait(2000)
  .evaluate(() => {
    const starsInfo = [...document.querySelectorAll('.TableCell-irMwDe')]
    
    const mappedStars = starsInfo.map(star => {
      
    })
    return mappedStars
  })
  .end()
  .then(result => {
    console.log('Nightmare script ran successfully', result)
  })
  .catch(error => {
    console.log('Nightmare script failed')
  });