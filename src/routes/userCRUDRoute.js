import app from '../app'
const connection = require('../connection/DBConnection');
let userCRUD = () => {

    /*
function and route for get all the users
*/
//localhost:8000/user
// here we have the route and the controller 
    let getUsers = () => {
        app.get('/user', async (req, res) => {// route 

            connection.con.query('select * from user', (err, result) => { // controller 
                try {
                    if (result.length > 0) {
                        res.status(200).json({ success: true, result: result });
                    } else {
                        res.status(404).json({ success: false });
                    }

                } catch (e) {
                    res.status(500).json({ success: false });

                }
            })
        });
    }

    /*
    function and route for get the user by id
    */
    let getUser = () => {
        app.get('/user/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from user where id=' + id, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.json({ success: true, result: result });
                    } else {
                        res.json({ success: false });
                    }

                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }

    /*
    function and route for create user
    */
    let createUser = () => {
        app.post('/user', async (req, res) => {
            //   let userDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var createStudent = {
                'name': req.body.name,
                'email': req.body.email,
                'password': req.body.password
            }

            var sql = "INSERT INTO user SET ?";
            try {
                connection.con.query(sql, createStudent, (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })



    }

    /*
    function and route for update user
    */

    let updateUser = () => {
        app.put('/user/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update user SET ? where id=?";
            var arr = req.body;
            try {
                connection.con.query(sql, [arr, id], (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })

    }
    /*
  function and route for deleting the user by id
  */

    let deleteUser = () => {
        app.delete('/user/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from user where id=' + id, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }
    /*
    we must call every function we created in above
    */
    getUsers();
    createUser();
    updateUser();
    getUser();
    deleteUser();
}

module.exports = { userCRUD };

