// we save all files and code for routing under folder name 'routes'
// route == is a path 
//Rest API: The Client sends requests to the server as data.


const express = require("express");
// In Node.js, we can bring external module by using ' require method'
// syntax: const varName = require("file route.")
const appRouter= express.Router();
// appRouter is a 'instance' of express.router() member method.

const ctrl = require("./home.ctrl");
//importing the: home.ctrl.js  

appRouter.get("/", ctrl.output.homePage);
//this API is getting 'output.homePage' from ctrl file.

appRouter.get("/login", ctrl.output.loginPage );
// Modulization of ctrl.
// this API: goes from "login" folder to 'ctrl' folder to get output.loginPage.
appRouter.get("/register", ctrl.output.registerPage );
appRouter.get("/calculation", ctrl.output.calculationPage );

appRouter.post("/login", ctrl.process.loginPage);
// This API: step 1) Receives Login Data such as ID and PW
//2) Send the received data at#1  to server. server processes Logging-in steps. 


module.exports= appRouter;



//notes


//#(req, res)=>{
    //  /              //: root
    //  get("/login")  // move from 'root' to 'login'
    //  res.send("HERE is the Root.");

//# res.render("home/index");
   // render 'home's' from 'index' folder.

   // when we are at first page of the app.
   // we take a client to 'index.ejs'
   //render("fileName")
  
  //*  // 
  ////respond with "hello world" when a GET request is made to the homepage(==root)
//  app.get('/', (req, res) => {
//    res.send('hello world')
//  })
//*//

//#});