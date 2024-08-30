## About the services

This project is divided into two different services.

The frontend was updated with the missing methods to manage the tasks.

The backend was developed using Nestjs as framework and Typescript. By separating it in a new folder/service, and using both Nest and Typescript it's easier to develop a robust solution, with proper validations and management.

The application doesn't have a permanent storage, but the data is saved in the backend. So a simple page refresh will not erase the data. In order to do so, you should restart the backend.

## How to run

This project is divided into two different services. The frontend inside the _frontend_ folder, and the backend in the _backend_ folder. In order to make it work properly they should both be running.

**Run Frontend**

If you're in the root folder go to the frontend folder( type _cd frontend_ in your terminal) and type _npm install_ to install all dependencies.
After all dependencies are properly installed, type _npm run dev_ to start the service.

```bash
# go to the right folder
$ cd frontend

# install dependencies
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

**Run Backend**

Create a new terminal, and access the backend folder. If you're in the root folder go to the backend folder( type _cd backend_ in your terminal) and type _npm install_ to install all dependencies.
After all dependencies are properly installed, type _npm run start:dev_ to start the service.
Backend is using Nestjs as the framework, so it may take a minute to bootstrap.

```bash
# go to the right folder
$ cd backend

# install dependencies
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

**Use application**

After both services are running, open your browser and go to *http://127.0.0.1:5173/*. It should be working just fine.
And now you can test the services.

The backend was develop to work with direct requests too. If you want to tests the endpoints directly with Postman or Insomnia it should work as well. The endpoints were develop to validate the parameters and returns error in case it's not what the endpoint expects.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
