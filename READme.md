# Integration Engineer Test

We appreciate your interest in the Integration Engineer role at our company. This test helps us understand your skills in creating a Node.js backend API and a ReactJS frontend. You should finish the test within a few hours. Please read the instructions carefully.

## Task Overview:

Your task is to build a simple task management application. This template offers a basic setup for a React frontend using Vite, which connects to a Node/Express backend. Users should be able to view, create, update, and delete tasks.

There are different parts to this exercise:

1. Set up the backend and frontend, resolving any issues that may arise (some issues might not have been noticed by the original developer since 'it works locally').
2. Complete the endpoints for task creation and deletion.
3. Implement missing functions in the React frontend to interact with the new endpoints for task creation and deletion.
4. Develop a new endpoint in the Express app for updating tasks. Create a UI allowing users to update tasks and communicate with this new endpoint.
5. Update the CSS to improve the usability of the solution.

_Additional Information_

- Tasks should be stored temporarily in memory; permanent storage is not necessary.
- Prevent creating or updating tasks with empty titles or descriptions. Display an error if users attempt to submit an invalid task. (Your backend should handle this check and return an error.)
- No guidance is available from the previous developer on setting up the project on a new machine. You'll need to use the existing files to figure it out, considering possible mistakes.
- The backend is in JavaScript, while the frontend React code is in a .tsx file. Make sure your work is valid TypeScript.
- Enable CORS support in the API to permit cross-origin requests.
- The app's rudimentary styling by the previous developer can be improved for better user experience.
- BONUS: If you can optimize the React app's rendering for efficiency, feel free to make changes.

_Submission Guidelines_

- Fork this GitHub repository to your own GitHub account.
- Develop the backend and frontend using the provided directory structure.
- Edit this README below to explain how to run both the backend and frontend.
- Once done, share the link to your forked repository via email.

_Evaluation Criteria_

- Functionality: Does the app meet the requirements and work error-free?
- Code Quality: Is the code well-structured, modular, and easy to understand?
- API Design: Did you design the API in a RESTful way? Is error handling and validation effective?
- Frontend Design: Is the frontend user-friendly, responsive, and visually appealing?
- Git Usage: Are your commits meaningful and code changes well-tracked?
- Documentation: Are instructions provided for setting up the app on a new machine?

Use this opportunity to showcase your skills. If you see fit, add extra features or improvements.

Please note that this test aims to be completed in a few hours. However, quality work is more important than speed. If you have questions, feel free to email us.

Best wishes, and we're excited to review your submission!

Regards,
The Duda Solutions Engineering Team

## Add any instructions to get your submission running below this line.

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

**Run Backend**

Create a new terminal, and access the backend folder. If you're in the root folder go to the backend folder( type _cd backend_ in your terminal) and type _npm install_ to install all dependencies.
After all dependencies are properly installed, type _npm run start:dev_ to start the service.
Backend is using Nestjs as the framework, so it may take a minute to bootstrap.

```bash
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
