[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
[![Build Status](https://travis-ci.org/andela/mervels-bn-backend.svg?branch=develop)](https://travis-ci.org/andela/mervels-bn-backend)
[![Coverage Status](https://coveralls.io/repos/github/andela/mervels-bn-backend/badge.svg?branch=develop)](https://coveralls.io/github/andela/mervels-bn-backend?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/409de278c145e999c9a7/maintainability)](https://codeclimate.com/github/andela/mervels-bn-backend/maintainability)

Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======

## Vision
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.
--

## Pre-Requisites 
- Postgresql and database created
- Redis 

## How to Install and run the application 
- Clone the application and run `npm install`
- Run `cp .env.example .env` to create .env variables and fill them 
- Run `npm db-migrate:dev` to create db migrations 
- Run `npm db-seed:test` to add seeders to the database if u need.
- Run `npm run start:dev` to start development server

### User Credentials seeded to the Database
***Super Administrator***
```
{
	"userEmail": "johndoe@gmail.com",
	"userPassword": "Root1123#"
}
```
***Manager***
```
{	
   "userEmail": "marveldev53@gmail.com",
    "userPassword": "Root1123#"
}
```
***Travel Admin***
```
{
	"userEmail": "janedoe@gmail.com",
	"userPassword": "Root1123#"
}
```
***Requester***
```
{	
   "userEmail": "marveldev53@gmail.com",
    "userPassword": "Root1123#"
}
```


## Docker Development Setup 
- Install Docker from [Docker For Mac](https://docs.docker.com/docker-for-mac/install/) or [Docker For Windows](https://docs.docker.com/docker-for-windows/install/)for windows you will also need to install [docker-compose](https://docs.docker.com/compose/install/)
- After cloning the application from Github. Switch to the main app where there's the Dockerfile and the docker-compose.yml file
- Create a .env file and copy .env.example and fill the variables 
- Run `docker-compose up`. Make sure port `3000` is not taken if so change the port in docker-compose.yml file. 
- Test the application on the link `127.0.0.1:3000/api/docs` 

## API Documentation 
- [Swagger Documentation on Heroku](https://mervels-bn-backend-staging.herokuapp.com/api/docs/)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/18a507d658ad0f709bcc#?env%5BBarefoot-Marvel%20-%20Local%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwOi8vMTI3LjAuMC4xOjMwMDAiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InRva2VuIiwidmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZNVEFzSW5WelpYSkZiV0ZwYkNJNkltaDFiRUJ0WVhKMlpXeHpMbU52YlNJc0ltWnBjbk4wVG1GdFpTSTZJa2gxYkdzaUxDSnNZWE4wVG1GdFpTSTZJbFJvYjNJaUxDSmhZMk52ZFc1MFZtVnlhV1pwWldRaU9uUnlkV1VzSW1WdFlXbHNRV3hzYjNkbFpDSTZkSEoxWlN3aWRYTmxjbEp2YkdWeklqb2lVbVZ4ZFdWemRHVnlJaXdpYVdGMElqb3hOVGN3TkRZME1UY3lMQ0psZUhBaU9qRTFOekEwTmpjM056SjkuMFR3R0Q0QkNBXzJjcTcwSlBUU3JmZXFWWEx6ZzlwTHpiTWJLSVQ2TXk1RSIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibWFuYWdlclRva2VuIiwidmFsdWUiOm51bGwsImVuYWJsZWQiOnRydWV9LHsia2V5IjoidXNlcjNUb2tlbiIsInZhbHVlIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2TXl3aWRYTmxja1Z0WVdsc0lqb2lhbUZ0WlhOa2IyVkFaMjFoYVd3dVkyOXRJaXdpWm1seWMzUk9ZVzFsSWpvaVNtRnRaWE1pTENKc1lYTjBUbUZ0WlNJNklrUnZaU0lzSW1GalkyOTFiblJXWlhKcFptbGxaQ0k2ZEhKMVpTd2laVzFoYVd4QmJHeHZkMlZrSWpwMGNuVmxMQ0oxYzJWeVVtOXNaWE1pT2lKU1pYRjFaWE4wWlhJaUxDSnBZWFFpT2pFMU56QTBOak16TlRBc0ltVjRjQ0k2TVRVM01EUTJOamsxTUgwLmRwRXNCd1JTVTZlS1hmSDVseWY1WDRpWFEwXzNCOTNsQXlMT1lsYmtsTnMiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6InRyYXZlbEFkbWluVG9rZW4iLCJ2YWx1ZSI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNk1pd2lkWE5sY2tWdFlXbHNJam9pYW1GdVpXUnZaVUJuYldGcGJDNWpiMjBpTENKbWFYSnpkRTVoYldVaU9pSktZVzVsSWl3aWJHRnpkRTVoYldVaU9pSkViMlVpTENKaFkyTnZkVzUwVm1WeWFXWnBaV1FpT25SeWRXVXNJbVZ0WVdsc1FXeHNiM2RsWkNJNmRISjFaU3dpZFhObGNsSnZiR1Z6SWpvaVZISmhkbVZzSUVGa2JXbHVhWE4wY21GMGIzSWlMQ0pwWVhRaU9qRTFOekEwTmpJek5URXNJbVY0Y0NJNk1UVTNNRFEyTlRrMU1YMC5wcG93R0VzV2tpVm9ZRTVuU2FhN2FlY2pUOVRCQ3JOdlZsa1BIZjJpaGtvIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJzdXBlckFkbWluVG9rZW4iLCJ2YWx1ZSI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNk1Td2lkWE5sY2tWdFlXbHNJam9pYW05b2JtUnZaVUJuYldGcGJDNWpiMjBpTENKbWFYSnpkRTVoYldVaU9pSktiMmh1SWl3aWJHRnpkRTVoYldVaU9pSkViMlVpTENKaFkyTnZkVzUwVm1WeWFXWnBaV1FpT25SeWRXVXNJbVZ0WVdsc1FXeHNiM2RsWkNJNmRISjFaU3dpZFhObGNsSnZiR1Z6SWpvaVUzVndaWElnUVdSdGFXNXBjM1J5WVhSdmNpSXNJbWxoZENJNk1UVTNNRFEyTlRBNE1pd2laWGh3SWpveE5UY3dORFk0TmpneWZRLjEwZUlISFZiTzdLcFhsa3BiaVZXeU8wa0EtQzJnelBmMks5dVJFN0hjaXMiLCJlbmFibGVkIjp0cnVlfV0=)


| End Point Name     | Method    |  Category     | EndPoint             | Description |   
|--------------------|---------- | --------------|----------------------|-------------|
| Register User      | **POST**  | Users         | `/api/v1/auth/signup`  | This registers a users to the system |
| Verify User        | **PATCH** | Users         | `/api/v1/auth/verify?token=` | User verify account
| Login User         | **POST**  | Users         | `/api/v1/auth/sigin`   | This signs in a user to the system   |
| Update User Role   | **PUT**   | Users         | `/api/v1/auth/updateRole` | Manager can update user roles  |
| Reset User Password| **PUT**   | Users         | `/api/v1/auth/resertPassword/{id}/token` | User reset Password|
| Get UserProfile    | **GET**   | Users         | `/api/v1/profile` | Gets the user profile |
| Update UserProfile | **PATCH** | Users         | `/api/v1/profile` | Updates user profile|
| Signout            | **POST**  | Users         | `/api/v1/auth/signout`| Logsout singed in user|
| One Way Request    | **POST**  | Requests    | `/api/v1/requests/oneway`| Creates a oneway request|
| Return Request     | **POST**  | Requests    | `/api/v1/requests/oneway`| Creates a oneway request|
| Multicity Request  | **POST**  | Requests    | `/api/v1/requests/multi_city`| Creates a oneway request|
| Pending Requests | **GET**  |Requests | `/api/v1/requests/`| Manager get all pending requests
| Search Requests | **GET** | Requests | `/api/v1/requests?{params}` | Users can search through requests 
| Approve Request | **PATCH** | Requests | `api/v1/requests/approve/{id}` | Manager Approve request using Request Id
| Reject Request | **PATCH** | Requests | `api/v1/requests/reject/{id}` | Manager Reject request using Request Id
| All accommodations | **GET**   | Accommodations| `/api/v1/accommodations`| Get all accommodations
| Accommodation by ID| **GET**   | Accommodations| `/api/v1/accommodations/{id}`| Get accommodation by ID
| Add accommodation  | **POST**  | Accommodations| `/api/v1/accommodations`| Create accommodation
| Rate accommodation | **POST**  | Accommodations| `/api/v1/accommodations/{id}/ratings`| Rate an accommodation
| Review accommodation| **GET**  | Accommodations| `/api/v1/accommodations/{id}/feedback`|Add feedback to accommodation
| Like/Unlike   | **PATCH**  | Accommodations| `/api/v1/accommodations/{id}/like`| User to like/unlike accommodation
| Add Room   | **POST**  | Accommodations| `/api/v1/accommodations/rooms`| Travel Admin to add rooms to accommodation
| Add comment | **POST**  | Comments| `/api/v1/request/{id}/comment`| User can comment on Requests by Id
| Requests Comments | **GET**  | Comments| `/api/v1/request/{id}/comment`| User get all comments they added to requests
| Update comment | **PATCH**  | Comments| `/api/v1/requests/comments/{id}`| User update comment by Id
| Delete comment | **DELETE**  | Comments| `/api/v1/requests/comments/{id}`| User delete comment by Id



## Technologies Used
- NodeJs / Express
- Postresql Database with Sequelize as ORM
- Redis
- Swagger for API Documentation 
- Heroku For Hosting
## Contributors 
- [Bahati Robben](https://github.com/Bahatiroben)
- [Davis Kabiswa](https://github.com/Dkabiswa)
- [Jonathan Aurugai](https://github.com/j0flintking02)
- [Jonathan Shyaka](https://github.com/drayzii)
- [William Vedastus](https://github.com/willywax)
- [Paul Otieno -TTL](https://github.com/Paulstar200)
