import app from '../app'
const connection = require('../connection/DBConnection');
let teamCRUD = () => {

    /*
function and route for get all the teams
*/
    let getteams = () => {
        app.get('/team', async (req, res) => {

            connection.con.query('select * from team', (err, result) => {
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
    function and route for get the team by id
    */
    let getteam = () => {
        app.get('/team/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select * from team where id=' + id, (err, result) => {
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
    function and route for create team
    */
    let createteam = () => {
        app.post('/team', async (req, res) => {
            //   let carDetails={'name':'omar','email':'omar@gail.com','password':'1212'};

            var obj=req.body;

            var sql = "INSERT INTO team SET ?";
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
    function and route for update team
    */

    let updateteam = () => {
        app.put('/team/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update team SET ? where id=?";
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
  function and route for deleting the team by id
  */

    let deleteteam = () => {
        app.delete('/team/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from team where id=' + id, (err, result) => {
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
    getteams();
    createteam();
    updateteam();
    getteam();
    deleteteam();
}

module.exports = { teamCRUD };