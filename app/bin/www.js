//compile: node ./bin/www.js


// we did this 
//module.exports = app;
// at app.js to use 'app' at this current file.

const appRouter = require("../app");
const PORT = 3000;

appRouter.listen(PORT, () => {  
    console.log("Server is UP and being executed");   
});
// Opening the server for the web ! 서버 띄우는 기능.
// app.listen
//:using .listen command, we are requesting to open port number 3000 .
// listen(parameter(s)), 
// the second parameter == call back function which is a arrow function.
// () => == function()