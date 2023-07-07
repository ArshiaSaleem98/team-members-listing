# Team & Members Listing Website

This website is a simple yet powerful solution that allows you to manage teams and their members effectively. Built using Vue.js and Node.js, this website demonstrates seamless interaction between the frontend, backend, and an SQL database (SQLite). It provides a range of features, including viewing details, adding, editing, and deleting teams and members.

## Installation

To get started, follow the steps below to set up the Team & Members Listing website on your local machine.

1. Clone the repository using Git:

   `git clone https://github.com/ArshiaSaleem98/VueProject.git`

### Backend Setup

1. Go to the root of the project and navigate to the backend directory:

   `cd backend`

2. Install the required dependencies:

   `npm install`

3. Locate the database file in the /backend/db folder. You may use the provided database file or create a new one if needed.

### Frontend Setup

1. Go to the root of the project and navigate to the frontend directory:

   `cd frontend`

2. Install the required dependencies:

   `npm install`

## Usage

### Running the Application

To start the server and the client side of the application, follow the steps below:

1. Start the backend server:

   `cd backend`
   
   `npm run dev`

The server will run on `http://localhost:3000`.

2. Open a new terminal window and navigate to the frontend directory:

`cd frontend`

3. Start the frontend sevrer:

`npm run start`

The client side of the application will run on `http://localhost:8080`.

Now you will able to access the Team & Members Listing website in your web browser by visiting `http://localhost:8080`.

## Tools and Libraries

The following tools, libraries, and frameworks are being used in the development of this application:

### Backend Tools and Libraries

- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side development.
- Express.js: A fast and minimalist web application framework for Node.js, used for building the backend server.
- SQLite: A serverless, relational database engine used to store team and member data.

### Frontend Tools and Libraries

- Vue.js: A progressive JavaScript framework for building user interfaces, used for frontend development.
- Vue Router: A routing library for Vue.js, enabling navigation and routing within the application.
- Axios: A promise-based HTTP client for making API requests, used to communicate between the frontend and backend.
- Bootstrap: A popular CSS framework for responsive and mobile-first web development, used for styling the application.
- SCSS: A preprocessor for CSS, enhancing the styling capabilities and maintainability of the application's CSS code.
- BEM Methodology: A CSS naming convention that stands for Block, Element, Modifier. It helps in writing modular and reusable CSS by providing a structured way of naming classes.

### Code Quality and Compatibility Tools
- ESLint: A JavaScript linter for maintaining code quality and ensuring adherence to coding standards.
- Babel: A JavaScript compiler that transforms modern JavaScript code into backward-compatible versions, ensuring cross-browser compatibility.

These tools, libraries, and frameworks, along with the BEM methodology, have been used to create a robust and efficient Team & Members Listing website. 

## Project Structure

The Team & Members Listing website has a well-organized project structure, with separate sections for the backend and frontend. Here is an overview of the project structure:

### Backend Structure

```
backend/
├─ controllers/      => Contains controller files for handling business logic
├─ db/               => Holds the database file and related scripts
├─ models/           => Includes the models representing database entities
├─ routes/           => Contains the route files for defining API endpoints
└─ server.js         => Main server configuration file
```

### Frontend Structure

```
frontend/
└─ src/
    ├─ assets/         => Project assets (e.g., images, styles)
    ├─ components/     => Vue global components
    ├─ router/         => Vue-router configuration
    ├─ services/       => API service files for making HTTP requests
    ├─ utils/          => Global constants and helper functions
    ├─ views/          => Layouts for views
    ├─ App.vue         => Main App component
    └─ main.js         => Main Vue instance
    └─ config.js       => Custom configuration file to define the base URL for Vue app and for testing
    └─ vue.config.js   => Vue CLI configuration file
```










   




