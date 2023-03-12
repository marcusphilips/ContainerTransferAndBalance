//# controller's js file
//const app = require("../app");

const homePage= (req,res) => {
       res.render("home/index");
};

const loginPage= (req,res ) =>
{
res.render("home/login");
};

/*
appRouter.get("/login", (req, res) => {
       res.render("home/login");
   
       // router.get('/',) == router.get('주소', (function.) );
       // 주소로 GET 요청.
       // #1.customer's request: "/login"
       // #2.Response to #1.: (req, res) => {
      // res.render("home/login");
      // We call the response code == controller.
   });
*/
// helloFunction 이라는 컨트롤러 함수를 만들어서 이를 외부에서 사용해줄 것.
// same as
/*
function helloFunction (req,res)  {
       res.render("home/index");
};
*/

//lastly; hello, login를 현재 파일 "home.ctrl.js" 밖에서 쓸수 있도록,
// index.js에서 쓸 것임. 
// module 를 통해서 objectf\로 빼줄 것
module.exports ={
homePage,
loginPage
};

/*
{
//same as:
//{key:key}
hello:hello;
login:login;
}
*/