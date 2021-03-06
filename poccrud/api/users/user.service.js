const mysqlConnection = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        mysqlConnection.query(
            'CALL crud(?,?,?,?,?,?,?,?,"Insert")',
           // 'insert into registration(firstName, lastName, gender, email, password, number)values(?,?,?,?,?,? )',
           [
            data.id,   
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.role,
            data.choice
           ],
           (error, results, fields) => {
               if (error) {
                  return callback(error);
               }
               return callback(null, results);
           }
        );
    } ,
// };


// module.exports = {
    // create: (data, callback) => {        
    // },
    getUsers: callback => {
        mysqlConnection.query(
            'select id,firstName, lastName, gender, email, password, number from registration',
            [],
            (error, results, fields) => {
                if(error)
                {
                   return callback(error);    
                }
                return callback(null, results);
            }
        );
    },

// };

// module.exports = {
    // create: (data, callback) => {},
    // getUsers: callback => {
    // },
    getUserById: (id, callback) => {
        mysqlConnection.query(
            'select id,firstName, lastName, gender, email, password, number from registration where id = ?',
            [id],
            (error, results, fields) => {
                if(error)
                {
                   return callback(error);    
                }
                return callback(null, results[0]);
            });
    } ,

    getUserByIdSp: ( id, callback) => {
            mysqlConnection.query("CALL getUserDetail(?)", 
            [id], (error, results, fields)=>{
                if(error)
                {
                   return callback(error);    
                }
                return callback(null, results[0]);
            });      

    },





    updateUser: (data, callback) => {
        mysqlConnection.query(
            'CALL crud(?,?,?,?,?,?,?,?,"Update")',

           // 'update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?',
           [
            // data.firstName,
            // data.lastName,
            // data.gender,
            // data.email,
            // data.password,
            // data.number,
            // data.id
            data.id,   
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.role,
            data.choice
           ],
           (error, results, fields) => {
               if (error) {
                  return callback(error);
               }
               return callback(null, results[0]);
           }
        );
    } ,

    deleteUser: (data, callback) => {
        mysqlConnection.query(
            'CALL crud(?,?,?,?,?,?,?,?,"Delete")',

           // 'delete from registration where id = ?',
            [
                //data.id,
            data.id,   
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.role,
            data.choice
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    getUserByEmail: (email, callback) => {
        mysqlConnection.query(
            'select * from registration where email = ?',
            [email],
            (error, results, fields) => {
                if (error) {
                    callback(error)
                }
                return callback(null, results[0]);
            }
        );
    }
};