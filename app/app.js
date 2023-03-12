// this is a main file 
"use strict";
// * Module
//file for server workings: using Express server framework.
const express = require("express");
const app= express();

//const POST = 3000;
// * Routing
const home= require("./src/routes/home");
// '/driectoryName/fileName' ex) "/desktop/ucr/winter23/cs170/test.c"
//differenct btw:
//1) /desktop/ucr  == root directory(desktop).
//2) ./rountes/home = ./ == current directory 


// * App setting
//1. App setting:Navigation bar
// we will set up the view of web
app.set("views", "./src/appViews");
// set the 'files 'views'' and save ' views files' to 'created folder : appViews'
// I have created the actual folder in the visual studio.

app.set("view engine", "ejs");
//setting the engine that interprets the HTML file under appViews file.
// 'the view engine' we have set up to interpret HTML is ejs.
// The view engine is ejs 
//./ == at curr folder, go to 'routes' folder. then
// go to 'home' folder.

app.use(express.static(`${__dirname}/src/public`));
// what is the difference btw `` and '' ??
//미들웨어 등록: 어떤 미들 웨어 냐면, login.js 와 login.ejs 이 두파일을
//연결 시켜주는 미들웨어임.
//app.use(express.static('${__dirname}/src/public'));
//== 현재 directory폴더 안에, Src 폴더 안에, publuc 폴더를 정적 경로로 추가 완료 됌.

// * Routing
//const home= require("./routes/home");
app.use("/",home); 
//use() is method to register middle ware.


// to use 'app' method at the outside of this file 'app.js'
// we must export 'app' feature
module.exports = app;