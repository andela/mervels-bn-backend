[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
[![Build Status](https://travis-ci.org/andela/mervels-bn-backend.svg?branch=develop)](https://travis-ci.org/andela/mervels-bn-backend)

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