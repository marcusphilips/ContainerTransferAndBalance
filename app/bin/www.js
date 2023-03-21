//compile: node ./bin/www.js

const appRouter = require("../app");
const PORT = 3000;

appRouter.listen(PORT, () => {  
    console.log("Server is UP and being executed");   
});
// Opening the server for the web ! 
// app.listen
//:using .listen command, we are requesting to open port number 3000 .
// listen(parameter(s)), 
// the second parameter == call back function which is a arrow function.
// () => == function()