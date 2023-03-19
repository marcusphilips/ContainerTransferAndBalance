//# controller's js file

// in order to validate log-in of existing user.
//creating users obj
const users ={
       id_val_existing: ["claireJg", "UCR", "LLC"],
       pw_val_existing: ["0430", "179M", "2000"],
       // they are matching depends on their order.
};



const output ={
//creating object called output.
// this object is for rendering(showing theresult)
       homePage: (req,res) => {
              res.render("home/index");
       },

       loginPage: (req,res ) =>
       {
       res.render("home/login");
       },

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

const process ={
       //this object processes to login by receiving the userData and then logging in.
       loginPage: (req,res) => {
              //loginPage 함수가 동작해서, 콘솔에 'req.body' 데이터를 display.
              console.log(req.body);
              //=> displayed on VS terminal only
              // result: id_val: 'monday'
              // result is JS object.
              //여기서 req는 front엔드가 'log.js'에서 서버로 (컨트롤러 파일로) 전달한 '요청 데이터들임.' 

              // validation: if (existing-log-in info)==(log-in attempt)
              // saving the value of id and PW from a frontEnd user.
              const id_from_frontEnd = req.body.id_val,
              pw_from_frontEnd= req.body.passWord_val;
              console.log("--"); //=> displayed on VS terminal only
              console.log("userInput Id : ", id_from_frontEnd); //=> displayed on VS terminal only
              


              if(users.id_val_existing.includes(id_from_frontEnd)){
                     console.log(process.id_from_frontEnd);

                    const idx= users.id_val_existing.indexOf(id_from_frontEnd);
                     if(users.pw_val_existing[idx] === pw_from_frontEnd){
                     // if pw is validated, 
                            return res.json({
                            // if user is validated to login, 
                            // then return, the 'response' with 'json obj'. ex) res.json()
                            login_success: true,
                            loginMsg: "Login successed",
                            });
                            //login-successed ture 라는 obj를 json() 형태로 만들어서 프론트 엔드로 응답할거고.body
                            // 실패했다면 
                     }
              }
              return res.json({
                            login_success: false,
                            loginMsg: "Login Failed. Due to wrong user id, or user password input.",
              });

       },
};

//lastly; hello, login를 현재 파일 "home.ctrl.js" 밖에서 쓸수 있도록,
// index.js에서 쓸 것임. 
// module 를 통해서 objectf\로 빼줄 것
module.exports ={
       //exporting objects, so that we can access to these obj outside of this file.
output,
process,
};




/*
{
//same as:
//{key:key}
hello:hello;
login:login;
}
*/