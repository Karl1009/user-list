# User Management Web Application

This is a web application for managing users. The application provides a table view of user data with sorting and filtering functionality. The application is also responsive and optimizes the user interface for mobile screens.

## Installation
First, clone the repository to your local machine:

```
git clone <repository-url>
```

Next, navigate to the project directory:
```
cd ./frontend
```
Then, install all the dependencies:
```
npm install
```
## Running the Application
To start the application, you can use the start script provided in the package.json file. Run the following command:

```
npm start
```
This will start the application and you can view it at http://localhost:3000 in your web browser.

## Running the Tests
To run the tests for the application, you can use the test script provided in the package.json file. Run the following command:
```
npm test
```

`This will start Jest and run all the tests in the __tests__ directory.`

## How to Use
When you first load the application, you will see a table filled with user data. You can sort the data by clicking on the table headers. Clicking a header once will sort the data in ascending order, and clicking it again will sort the data in descending order.

You can also filter the user data. Choose the property you want to filter by using the dropdown menu above the table, and then type your filter string into the text box next to the dropdown menu. The table will automatically update to show only the users that match your filter.

For mobile screens, the application switches from a table view to a card view. Each user's data is displayed on a separate card.