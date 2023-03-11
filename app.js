// * Module
//file for server workings: using Express server framework.
const express = require("express");
const app= express();

const POST = 3000;
// * Routing
const home= require("./routes/home");
// '/driectoryName/fileName' ex) "/desktop/ucr/winter23/cs170/test.c"
//differenct btw:
//1) /desktop/ucr  == root directory(desktop).
//2) ./rountes/home = ./ == current directory 
// * App setting
//1. App setting:Navigation bar
// we will set up the view of web
app.set("views", "./appViews");
// set the 'files 'views'' and save ' views files' to 'created folder : appViews'
// I have created the actual folder in the visual studio.

app.set("view engine", "ejs");
//setting the engine that interprets the HTML file under appViews file.
// 'the view engine' we have set up to interpret HTML is ejs.
// The view engine is ejs 

//./ == at curr folder, go to 'routes' folder. then
// go to 'home' folder.
// * Routing
//const home= require("./routes/home");
app.use("/",home); 
//use() is method to register middle ware.


// to use 'app' method at the outside of this file 'app.js'
// we must export 'app' feature
module.exports = app;