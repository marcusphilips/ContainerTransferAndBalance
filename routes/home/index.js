// we save all files and code for routing under folder name 'routes'

//Rest API: The Client sends requests to the 
// server as data. The server usese
const express = require("express");
//
// In Node.js, we can bring external module by using ' require method'
// syntax: const varName = require("file route.")
// file route= 파일 경로=경로는 파일의 위치를 알려주는 주소.
// require 라는 node.js 의 메소드를 통해, 파일에서 특정 '외부 모듈' 가져오기
//we  do, equire 'express'

const appRouter= express.Router();
// appRouter is a 'instance' of express.router() member method.


//home.ctrl.js 에서 export 한 모듈을 받아줘야 현 파일 index.js 에서 쓸 수 있음.
const ctrl = require("./home.ctrl");

appRouter.get("/", ctrl.homePage);
//컨트롤러 기능을 갖는 '콜백함수'를 복사하려는 것

//#(req, res)=>{
    // /: root
    // get("/login"): root 에서 login 으로 이동
   //res.send("HERE is the Root.");

//# res.render("home/index");
   // render 'home's' from 'index' folder.

   // when we are at first page of the app.
   // we take a client to 'index.ejs'
   //render("fileName")
  
   //
  //*  // 
  ////respond with "hello world" when a GET request is made to the homepage
//  app.get('/', (req, res) => {
//    res.send('hello world')
//  })
//*//

//#});

//2:using require command, we are downloading express module.
// that exists under 'node_modules' file.
//3: express() == Executing express. Express ()== express 실행. 변수  app 에 저장.
// the execution of express server framework is saved in the variable called app, 
//4: Make a root route. "/" == root route.
// route == is a path 
// when A brower recieve REQUEST inquiry from the Root route, then a browser will show the RESPONSE from the REQUEST. app.listen(3000, () => {
// 

appRouter.get("/login", ctrl.loginPage );
// controller 의 모듈화: login 경로로 왔을떄는 loginFunction 을 통해서 로그인 화면으로 가는 구나.
// 를 명확하게 알 수 있게 되었음.
    

//ROUTING:
//app.get() =>{ 
    //res.send( We put all the .html codes at here )
    // ` : is needed 
//)}

// to use this 'index.js' at the other file.
// we declare 'index.js' as a module.
//다른 파일에서 index.js 코드 쓸 수 있도록, export module, 
// 이용해서 던져주기

module.exports= appRouter;