[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
[![Build Status](https://travis-ci.org/andela/mervels-bn-backend.svg?branch=develop)](https://travis-ci.org/andela/mervels-bn-backend)
[![Coverage Status](https://coveralls.io/repos/github/andela/mervels-bn-backend/badge.svg?branch=develop)](https://coveralls.io/github/andela/mervels-bn-backend?branch=develop)

Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======

## Vision
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

---
## Setup

### To use environment variables:
- Add a `.env` file in the root directory.
- You can now add environment variables to the file like this: `DB_HOST=localhost`
- Require dotenv in your working module: `const dotenv = require("dotenv")`
- Then add `dotenv.config()` to your code
- To access variables use `process.env.<variable>`. E.g: `process.env.DB_HOST`

### Setting up sequelize to work:
- Install `sequelize` and `sequelize-cli` globally
- For development we are using a `DEV_DATABASE_URL` variable to keep our DB url in `.env` (Add `export` in front of it)
- Then run `npm run db-migrate:dev` to run migrations

### Running Application on Docker
- Install Docker from [Docker For Mac](https://docs.docker.com/docker-for-mac/install/) or [Docker For Windows](https://docs.docker.com/docker-for-windows/install/)for windows you will also need to install [docker-compose](https://docs.docker.com/compose/install/)
- After cloning the application from Github. Switch to the main app where there's the Dockerfile and the docker-compose.yml file
- Run `docker-compose up`. Make sure port `3000` is not taken if so change the port in docker-compose.yml file. 
- Test the application on the link `127.0.0.1:3000/api/docs` 