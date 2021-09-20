import app from '../app'
const connection = require('../connection/DBConnection');
let carCRUD = () => {

    /*
function and route for get all the cars
*/
    let getcars = () => {
        app.get('/car', async (req, res) => {

            connection.con.query('select * from car', (err, result) => {
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
    function and route for get the car by id
    */
    let getcar = () => {
        app.get('/car/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from car where id=' + id, (err, result) => {
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
    function and route for create car
    */
    let createcar = () => {
        app.post('/car', async (req, res) => {
            //   let carDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj=req.body;

            var sql = "INSERT INTO car SET ?";
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
    function and route for update car
    */

    let updatecar = () => {
        app.put('/car/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update car SET ? where id=?";
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
  function and route for deleting the car by id
  */

    let deletecar = () => {
        app.delete('/car/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from car where id=' + id, (err, result) => {
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
    getcars();
    createcar();
    updatecar();
    getcar();
    deletecar();
}

module.exports = { carCRUD };

// export function carCRUD() {
//     throw new Error('Function not implemented.');
// }

