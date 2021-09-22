import app from '../app'
const connection = require('../connection/DBConnection');
let missionCRUD = () => {

    /*
function and route for get all the missions
*/
    let getmissions = () => {
        app.get('/mission', async (req, res) => {
            
            let query = `SELECT
                m.date as date,
                m.time as time,
                m.description as description,
                m.destination as destination,
                t.teamname as team,
                c.id as carId,
                c.carnumber as carNumber
                FROM mission m
                INNER JOIN team t ON m.teamID=t.id
                INNER JOIN car c ON c.id=t.carID
                ORDER BY m.id`

            connection.con.query(query, (err, result) => {
                try {
                    if (result && result.length > 0) {
                        res.status(200).json({ success: true, result: result });
                    } else {
                        res.status(404).json({ success: false });
                    }

                } catch (e) {
                    console.log(e);
                    res.status(500).json({ success: false });
                }
            })
        });
    }

    /*
    function and route for get the mission by date
    */
    let getmission = () => {
        app.post('/mission', async (req, res) => {
            let date = req.body.date;
            let query = ``
            connection.con.query(query, (err, result) => {
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
    function and route for create mission
    */
    let createmission = () => {
        app.post('/mission', async (req, res) => {
            //   let missionDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj = req.body;
            var sql = "INSERT INTO mission SET ?";
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
    function and route for update mission
    */

    let updatemission = () => {
        app.put('/mission/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update mission SET ? where id=?";
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
  function and route for deleting the mission by id
  */

    let deletemission = () => {
        app.delete('/mission/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from mission where id=' + id, (err, result) => {
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
    getmissions();
    createmission();
    updatemission();
    getmission();
    deletemission();
}

module.exports = { missionCRUD };

// export function missionCRUD() {
//     throw new Error('Function not implemented.');
// }

