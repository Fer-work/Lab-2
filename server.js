// Include the libraries and other files I will need in my app
const express = require("express");

const path = require("path");

const sequelize = require("./config/connection");

const routes = require("./routes/index");

// Create an express library instance called "app"
const app = express();

// The .set() method is used to configure the express application settings.
app.set("view engine", "ejs");

//__dirname is a Node.js global variable that contains the absolute path of the current directory regardles of operating system. The .join() method is from the path module, which joins path segments together.
app.set("views", path.join(__dirname, "views"));

// Converts JSON data in the request body into a javascript object which we can acess in our route handlers via req.body
app.use(express.json());

// Adds middleware to parse incoming requests with URL-encoded payloads, typically from HTML forms. It converts data from the form in a JavaScript object which I can access via req.body;
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const PORT = process.env.PORT || 3001;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");

    return sequelize.sync({ alter: true, force: false });
  })
  .then(() => {
    // use the listen method of the app instance to start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}.`);
    });
  });
