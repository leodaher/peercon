var express  = require("express"),
    app      = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User     = require("./models/user");

//REQUIRING ROUTES
var indexRoutes = require("./controllers/index");

//SETUPS
mongoose.connect("mongodb://localhost/peercon");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

//ROUTES
app.use("/", indexRoutes);

//START SERVER
app.listen(3000, "localhost", function(){
    console.log("PeerCon server is up!");
});
