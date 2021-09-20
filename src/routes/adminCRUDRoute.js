import app from '../app'
const connection = require('../connection/DBConnection');
let adminCRUD = () => {

    /*
function and route for get all the admins
*/
// here we have the route and the controller 
    let getadmins = () => {
        app.get('/admin', async (req, res) => {// route 

            connection.con.query('select * from admin', (err, result) => { // controller 
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
    function and route for get the admin by id
    */
    let getadmin = () => {
        app.get('/admin/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from admin where id=' + id, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.json(result);
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
    function and route for create admin
    */
    let createadmin = () => {
        app.post('/admin', async (req, res) => {
            //   let adminDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj=req.body
            var sql = "INSERT INTO admin SET ?";
            try {
                connection.con.query(sql, [obj], (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })



    }

    /*
    function and route for update admin
    */

    let updateadmin = () => {
        app.put('/admin/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update admin SET ? where id=?";
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
  function and route for deleting the admin by id
  */

    let deleteadmin = () => {
        app.delete('/admin/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from admin where id=' + id, (err, result) => {
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
    getadmins();
    createadmin();
    updateadmin();
    getadmin();
    deleteadmin();
}

module.exports = { adminCRUD };


// export function adminCRUD() {
//     throw new Error('Function not implemented.');
// }
