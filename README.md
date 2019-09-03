Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======

## Vision
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

---
## Setup
To use environment variables:
- Add a `.env` file in the root directory.
- You can now add environment variables to the file like this: `DB_HOST=localhost`
- Require dotenv in your working module: `const dotenv = require("dotenv")`
- Then add `dotenv.config()` to your code
- To access variables use `process.env.<variable>`. E.g: `process.env.DB_HOST`