const express = require("express");

const applyMiddleware = require("./middleware"); // Import the middleware
const routes = require("./routes");
const userroutes = require("./userroutes");

const app = express();

const port = process.env.PORT;

applyMiddleware(app); // Apply middleware to Express app
userroutes(app); // Apply user routes
routes(app); // Define general routes for the application

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
