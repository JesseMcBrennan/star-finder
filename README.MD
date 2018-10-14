
# BYOB

[![Build Status](https://travis-ci.org/JesseMcBrennan/star-finder.svg?branch=master)](https://travis-ci.org/JesseMcBrennan/star-finder)

### Endpoints

* ##### GET - Stars `/api/v1/stars`

	Using this endpoint will return you an array containing all star objects - ex: [{id: 1, name: '11 Com', mass: '123.1231'}, {id: 2, name:'ASDFASD', mass: '123.11'},...]
    
* ##### GET - Stars `/api/v1/stars/:id`

	Get an individual star you need to send in the star ID through the params. This will return an object with the corresponding star. 

* ##### GET - Exoplanets `/api/v1/exoplanets`

	Using this endpoint will return you an array containing all exoplanets objects - ex: [{id: 1, name: '11 Com b', mass: '123.1231'}, {id: 2, name:'ASDFASD b', mass: '123.11'},...]
    
* ##### GET - Exoplanets `/api/v1/exoplanets/:id`

	Get an individual exoplanets you need to send in the star ID through the params. This will return an object with the corresponding exoplanets. 
	
* ##### POST -  New Star - /api/v1/stars
	To add a star to you need to send a request containing a name and mass. Missing a parameter will result in an error message.

* ##### POST -  New Star - /api/v1/exoplanets
	To add am exoplanet to you need to send a request containing a name and mass. Missing a parameter will result in an error message.

* ##### DELETE - Star - /api/v1/stars/:id
	To delete a specific star use the DELETE method including an id in the body.

* ##### DELETE - Exoplanet - /api/v1/stars/:id
	To delete a specific exoplanet use the DELETE method including an id in the body.
	
