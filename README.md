# Flight
## Clone the Repository
```bash
git clone https://github.com/SczSca/to-do-app.git
```

## To-do Frontend


### Getting Started

#### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/package-manager)
##### Package manager:
You may choose between one of these:
- npm (included in Node.js)
- [yarn](https://yarnpkg.com)

#### Open project directory
```bash
cd front-end/to-do_app/
```
#### Running app

##### Using npm

Installing dependencies used in project:
```bash
npm install
```
After installing, use this command to initialize app:
```bash
npm run start
```
##### Using yarn


Installing dependencies used in project:
```bash
yarn install
```
After installing, use this command to initialize app:

```bash
yarn start
```
The application will start and be available at: 
```bash
http://localhost:8080
```

#### Running tests

##### Using npm

```bash
npm run tests
```
##### Using yarn

```bash
yarn tests
```
### Features

The To-do List application includes the following features to help manage tasks efficiently:

- **Create To-do Items**: Users can create a new to-do item by specifying a name, priority, and optionally a due date.

- **Edit To-do Items**: Users can update the name, priority, and due date of existing to-do tasks. They can also clear the due date if it's no longer relevant.

- **Filter To-do Items**: Users can filter the to-do list based on the name (or part of the name), priority, and completion status (done/undone).

- **Sort To-do Items**: Users can sort to-do items by priority and/or due date. This allows for organizing tasks based on urgency and deadlines.

- **Mark as Done/Undone**: Users can mark to-do items as done by clicking a checkbox. There is also an option to mark items as undone if necessary.

- **Pagination**: The application supports pagination to manage a large number of to-do items efficiently.

- **Performance Metrics**: The application calculates and displays the average time between the creation and completion of to-do items. This metric is available both in general and grouped by priority to help measure performance.



## To-do Backend

This is the backend application for the To-do list app built with Spring Boot and Maven. This guide will help you set up and run the application locally.

### Getting Started

#### Prerequisites
Make sure you have the following installed:
- [Java 11+](https://openjdk.org/install/)
  ```bash
  //this will install the latest version check: https://formulae.brew.sh/formula/openjdk
  brew install openjdk
  ```
- [Maven](https://maven.apache.org/download.cgi)

#### Open project directory
```bash
cd back-end
```
#### Running app
```bash
mvn spring-boot:run
```
The application will start and be available at: 
```bash
http://localhost:9090
```

#### Running tests
```bash
mvn test
```

### Features

The To-do List application provides a set of RESTful API endpoints to manage tasks effectively. Below are the key API endpoints:

#### Base Endpoint
All endpoints are prefixed with `/api/tasks`.

#### Get Tasks
**Endpoint**: `GET /api/tasks/search/prior/{prior}/status/{status}/text/{text}/page/{page}/dateAsc/{isDateAsc}/priorAsc/{isPriorAsc}`  
**Description**: Fetch a list of tasks with pagination and various filtering options.  
- **Pagination**: Each page contains 10 tasks.
- **Sorting**: Sort tasks by priority and/or due date.
- **Filters**:
  - By completion status (done/undone).
  - By task name or part of the name.
  - By priority.

**Parameters**:
- `prior` (String): Filter by task priority.
- `status` (String): Filter by task status (done/undone).
- `text` (String): Filter by name or part of the name.
- `page` (int): Specify the page number.
- `isDateAsc` (String): Sort tasks by due date in ascending (`true`) or descending (`false`) order.
- `isPriorAsc` (String): Sort tasks by priority in ascending (`true`) or descending (`false`) order.

#### Get Time Metrics
**Endpoint**: `GET /api/tasks/time`  
**Description**: Retrieve performance metrics showing the average time between task creation and completion. This metric is displayed both in general and grouped by priority.

#### Create Task
**Endpoint**: `POST /api/tasks`  
**Description**: Create a new task with the following fields: name, priority, and due date (optional).  
**Request Body**: `TaskDTO` object containing the task details.  
**Validations**: Ensures that all required fields are provided and valid.

#### Delete Task
**Endpoint**: `DELETE /api/tasks/{id}`  
**Description**: Delete an existing task by its ID.  
**Parameters**:  
- `id` (Long): The unique identifier of the task to be deleted.

#### Update Task Info
**Endpoint**: `PUT /api/tasks/{id}`  
**Description**: Update the name, due date, or priority of an existing task.  
**Request Body**: `TaskDTO` object containing the updated task details.  
**Parameters**:  
- `id` (Long): The unique identifier of the task to be updated.

#### Update Task Status (Done/Undone)
**Endpoint**: `PATCH /api/tasks/{id}/change-status`  
**Description**: Update the status of a task to mark it as done or undone.  
- If the task is already marked as done, no action is taken.  
- If the status is changed to "done", the system updates the "done date" property.  
**Parameters**:  
- `id` (Long): The unique identifier of the task to change the status.






