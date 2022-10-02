# LAB - Class 06

## Project: Basic Auth

### Author: Branden Ge

### Problem Domain

This lab demonstrates how to implement basic sign-up and sign-in functionality using Basic Auth on an Express application.

- [CI/CD GitHub Actions](https://github.com/brandenge/basic-auth/actions)
- [Back-end server url production](https://basic-auth-88.herokuapp.com/)

### Setup

`.env` Environments variables set as shown in the `.env.sample`

- `PORT`
- `DATABASE_URL`

#### Running the app

- `npm start` or `nodemon` (if you have nodemon) to start the application.

#### Features / Routes

- POST : `/signup`
- POST : `/signin`
- GET : `/hello?name=value` - requires a `name` query parameter
- GET : `*` - catch-all route which always responds with a 404 Not Found error.

#### Tests

- `npm test` to run tests

#### UML Diagram

![UML Diagram](uml6.png)

Diagram created with [InVision](https://www.invisionapp.com/)

#### Credits: [Demo code from Ryan Gallaway at Code Fellows](https://github.com/codefellows/seattle-code-javascript-401d48/tree/main/class-06/inclass-demo)
