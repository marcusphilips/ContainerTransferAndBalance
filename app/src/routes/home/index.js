// we save all files and code for routing under folder name 'routes'
// 서버 파일.

//Rest API: The Client sends requests to the 
// server as data. The server usese
const express = require("express");
// In Node.js, we can bring external module by using ' require method'
// syntax: const varName = require("file route.")
const appRouter= express.Router();
// appRouter is a 'instance' of express.router() member method.

const ctrl = require("./home.ctrl");

appRouter.get("/", ctrl.output.homePage);
//이 해당 API는 output의 멤버인 homepage를 가져온다!라는 뜻.
//그래서 , 데이터를 서버로 보내기 위함임.
//컨트롤러 기능을 갖는 '콜백함수'를 복사하려는 것
// get(현재 디렉토리-> 파일 'ctrl'-> 아웃풋이라는 오브젝트의 'homepage' 멤버 키.)
//#(req, res)=>{
    // /: root
    // get("/login"): root 에서 login 으로 이동
   //res.send("HERE is the Root.");

//# res.render("home/index");
   // render 'home's' from 'index' folder.

   // when we are at first page of the app.
   // we take a client to 'index.ejs'
   //render("fileName")
  
  //*  // 
  ////respond with "hello world" when a GET request is made to the homepage
//  app.get('/', (req, res) => {
//    res.send('hello world')
//  })
//*//

//#});