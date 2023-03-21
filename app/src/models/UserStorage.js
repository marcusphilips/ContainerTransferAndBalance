
class UserStorage{
    static #users ={
            // static: we use  static method to call class' method without class' instance. outside of this file.
            // ex) const userStore= UserStorage.users
            //#: denote private class field.
            id_val_existing: ["claireJg", "UCR", "LLC"],
            pw_val_existing: ["0430", "179M", "2000"],
            name: [ "Claire", "Eaamon", "LLC"]
            // they are matching depends on their order.
    };
 
    static getUsers(...fields) {
        //1. getUsers: will access to private class meme
        // thus getUsers must be static declared function, as well.
        //2. ...fields == getting unknow number of param from 'home/ctrl.js/ function call.
        //ex) ...fields == id_from_frontEnd
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) =>{
            // study more here
            if(users.hasOwnproperty(field)){
                newUsers[field] = users[field];
            // if(id_val_existing has(id_from_frontEnd))
            // save the field val to object arr:newUsers[field]
            //when obj 'newUsers'

             }
            return newUsers;
        // return newUsers: 'newUsers' goes back to reduce('newUser') recursively.  
        }, {});
        return newUsers ;
    }
}


module.exports = UserStorage;

