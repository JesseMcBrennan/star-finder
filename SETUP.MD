# Get it

If you're planning on contributing code to the project (which we LOVE), it is a good idea to begin by forking this repo using the Fork button in the top-right corner of this screen. You should then be able to use git clone to copy your fork onto your local machine.

git clone https://github.com/JesseMcBrennan/star-finder
Jump into your new local copy of the star-finder
cd star-finder

And then add an upstream remote that points to the main repo:

git remote add upstream https://github.com/JesseMcBrennan/star-finder
Fetch the latest version of master from upstream (ie. the main repo):

git fetch upstream master

# Get it Running

`npm install`

`node server.js`

Ensure Postgres is installed.

`CREATE DATABASE exoplanets`

`CREATE DATABASE exoplanets_test`

`knex migrate:latest`

`knext seed:run`


