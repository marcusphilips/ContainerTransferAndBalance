// this is a main file .

"use strict";
// * Module 설치과정들
//file for server workings: using Express server framework.
const express = require("express");
const bodyParser = require("body-parser");
// 가져온 모듈 설치 방법: 터미널에 코드 컴파일, npm i body-parser -s
//
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

//#app.set("view engine", "ejs");
//setting the engine that interprets the HTML file under appViews file.
// 'the view engine' we have set up to interpret HTML is ejs.
// The view engine is ejs 
//./ == at curr folder, go to 'routes' folder. then
// go to 'home' folder.

app.use(express.static(`${__dirname}/src/public`));
// what is the difference btw `` and '' ??
//defining Middleware: The middleware coneect these two files, login.js & login.ejs.
//app.use(express.static('${__dirname}/src/public'));
//Purpose of the code: We are adding  'public' folder as the static route, by routing from 
// curr directory folder -> Src(folder)->public(folder).
//현재 directory폴더 안에, Src 폴더 안에, publuc 폴더를 정적 경로로 추가 완료 됌.

//Purpose of code: to successfully compile 'body-parser module'
// We are registering  middle ware of 'body-parser'.
// that is : JSON file을 parsing 햐줌.  
app.use(bodyParser.json());

// url 통해 전달되는 데이터에 한글,공백, 등과 같은 문자가 포함될 경우 생기는 문제 해결.
app.use(bodyParser.urlencoded({ extended: true }));

// * Routing
//const home= require("./routes/home");
app.use("/",home); 
//use() is method to register middle ware.


// to use 'app' method at the outside of this file 'app.js'
// we must export 'app' feature
module.exports = app;