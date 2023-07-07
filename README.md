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

## App Layout and Design

The Team & Members Listing website consists of a single page with a user-friendly interface. Below can be seen the layout and functionality of the various sections:

### Teams & Members:

### Teams Section

The Teams Section displays teams in accordions. It is located between the header and the team & member-creating buttons.

- Adding Team and Adding Member Buttons: Two buttons are displayed for adding a team and adding a member. When clicked, they open side modals containing the forms for creating a team and a member.

- Creating Member Form: The member creation form includes two fields: one for selecting the team and the other for entering the member's name. If any of the fields are not filled, a message is displayed prompting the user to complete the required information.

- Creating Team Form: The team creation form includes one field for entering the team name. After clicking the save button, the team will be created.
  
- Team Accordion Header: Each team accordion header displays the team's name, delete button, and edit button. Clicking the edit button allows the user to edit the team name directly within the header. If no changes are made, the name remains unchanged. The delete button opens a delete confirmation modal with two options: delete and cancel. Clicking delete will delete the team and its associated members.

- Dropdown Icon: The dropdown icon in the accordion header expands the accordion and reveals the content section.

- Team Details: The team details section displays the team name and its members, if any. If no team members are found, a message is displayed indicating "No team members found".

Team Members: This section displays the team members in a scrollable table format. Each member has two buttons: edit and delete. Clicking the edit button allows the user to edit the member's name within the table. Clicking the delete button opens a delete confirmation modal. Once confirmed, the member is removed.

### Pagination

Pagination is located below the team accordion section. It is only displayed if there is more than one page of teams. Each page can display a maximum of 10 teams. Arrow buttons are provided for easier navigation between pages.

With this intuitive layout and interactive functionality, users can easily manage teams and their associated members, add new teams and members, edit existing information, and navigate through the teams using pagination.

### Responsive Design and Device Compatibility

The Team & Members Listing website features a responsive design that adapts the layout to different devices, ensuring an optimal user experience across desktop, tablet, and mobile screens. Here's an overview of the responsiveness of the website:

- Desktop and Tablet Mode: In desktop and tablet modes, the website provides a spacious and user-friendly layout. The team section, accordions, buttons, forms, and tables are designed to make efficient use of the screen space, allowing users to view and manage teams and members effortlessly.

- Mobile Mode: In mobile mode, the website adopts a more compact design to accommodate smaller screens. The layout is optimized for mobile devices, providing a seamless experience for users on the go. The accordions, buttons, forms, and tables are adjusted to ensure readability and ease of use.

## Future Improvements and Enhancements

Here are some suggestions for future improvements and enhancements to further enhance the user experience of the Team & Members Listing website:

- Enhanced Search Functionality

Implement an advanced search feature that allows users to search for teams or members based on specific criteria, such as name. This will improve the usability of the application and enable users to quickly find the information they are looking for, even in large datasets.

- Error Handling and User Feedback

Enhance the error handling mechanism to provide clear and informative error messages to users when something goes wrong. Additionally, implement user feedback mechanisms such as success notifications or toast messages to provide a better indication of successful actions or updates.

## Thank You for Reading!

Thank you for taking the time to explore the Team & Members Listing website. I hope this README provided you with valuable insights into its features, functionality, and potential enhancements. If you have any questions or feedback, please don't hesitate to reach out. Your input is highly appreciated as i strive to continuously improve and refine the website.

I appreciate your interest and support!

Best regards.











   




