//# controller's js file

// in order to validate log-in of existing user.
//creating users obj
 const UserStorage = require("../../models/UserStorage");

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
   
       // router.get('/',) == router.get('address', (function.) );
       // GET request to the address above
       // #1.customer's request: "/login"
       // #2.Response to #1.: (req, res) => {
      // res.render("home/login");
      // We call the response code == controller.
   });
*/
// helloFunction: we are goint to create this controller function to use it outside of the file.
// same as
/*
function helloFunction (req,res)  {
       res.render("home/index");
};
*/

const process ={
       //this object processes to login by receiving the userData and then logging in.
       loginPage: (req,res) => {
              //loginPage function runs, 'req.body' data will be displayed in console.
              //req: are requested data that frontend request at 'log.js' to the server(ctlr file)
              console.log(req.body);
              //=> displayed on VS terminal only
              // result: id_val: 'monday'
              // result is JS object.
        
              // validation: if (existing-log-in info)==(log-in attempt)
              // saving the value of id and PW from a frontEnd user.
              const id_from_frontEnd = req.body.id_val,
              pw_from_frontEnd= req.body.passWord_val;
              console.log("--"); //=> displayed on VS terminal only
              console.log("userInput Id : ", id_from_frontEnd); //=> displayed on VS terminal only
              

               const users = UserStorage.getUsers("id_val_existing" ,"pw_val_existing");
             // console.log(UserStorage.getUsers("id_from_frontEnd","pw_from_frontEnd"));

              const response={}; // list type obj that will response

              if(users.id_val_existing.includes(id_from_frontEnd)){
                     console.log(process.id_from_frontEnd);
                       const idx= users.id_val_existing.indexOf(id_from_frontEnd);
                     if(users.pw_val_existing[idx] === pw_from_frontEnd){
                     // if pw is validated, 
                            response.login_success = true;
                            console.log("Login successed");
                            return res.json(response);
                            // return : object named response. in converting json file form.
                            
                     }
              }
              response.login_success=false;
              response.loginMsg=  "Login Failed. Due to wrong user id, or user password input.";
              return res.json(response);
              //delivering 'response'
       },
};


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