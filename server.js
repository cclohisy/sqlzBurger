//require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars")

//set up express
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

//set up stuff to work...

// Serve static content for the app from the "public" directory in the application directory
//avoids having to make paths for files linked in handlebars
app.use(express.static("public"));

// body parser stuff...
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//handlebars set up stuff
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//routes
require("./routes/api-routes.js")(app)
require("./routes/html-routes.js")(app)



db.sequelize.sync().then(function () {//{force:true}
  app.listen(PORT, function () {
    // log server has started in terminal
    console.log("Server listening on PORT " + PORT)
  })
})

