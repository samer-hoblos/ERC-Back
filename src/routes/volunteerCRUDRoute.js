import app from '../app'
const connection = require('../connection/DBConnection');
let volunteerCRUD = () => {

    /*
route and controller for getting all the volunteers
*/
    let getvolunteers = () => {

        app.get('/volunteer', (req, res) => {
            let sql = "SELECT * FROM volunteer";
            try {
                connection.con.query(sql, (err, result) => {
                    if (result.length > 0) {
                        res.status(200).json({ success: true, result: result });

                    } else {
                        res.status(404).json({ success: false });
                    }
                });

            } catch (e) {
                res.status(500).json({ success: false });
            }
        })
    }



    let getvolunteerName = () => {

        app.get('/volunteername', (req, res) => {
            let sql = `SELECT id, CONCAT(volunteer.firstName,' ',volunteer.lastName) as name           
            FROM volunteer`;
            try {
                connection.con.query(sql, (err, result) => {
                    if (result && result.length > 0) {
                        res.status(200).json({ success: true, result: result });

                    } else {
                        res.status(404).json({ success: false });
                    }
                });

            } catch (e) {
                res.status(500).json({ success: false });
            }
        })
    }


    /*
    route and controller for getting a specific volunteer by id
    */
    let getvolunteer = () => {
        app.get('/volunteer/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select volunteer.*, blood.name as blood from volunteer,blood where volunteer.bloodID=blood.id AND volunteer.id=' + id, (err, result) => {
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
    route and controller for getting a specific volunteer report by id
    */
    let getvolunteerReport = () => {
        app.get('/volunteerR/:id', async (req, res) => {
            let id = req.params.id
            connection.con.query('select report from volunteer where volunteer.id=' + id, (err, result) => {
                try {
                    if (result.length > 0) {
                        res.json({ success: true, report: result[0].report });
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
    route and controller for create a specific volunteer
    */
    let createvolunteer = () => {
        app.post('/volunteer', async (req, res) => {

            var createStudent = req.body

            var sql = "INSERT INTO volunteer SET ?";
            try {
                connection.con.query(sql, [createStudent], (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })
    }

    /*
    route and controller for update a specific volunteer by id
    */
    let updatevolunteer = () => {
        app.put('/volunteer/:id', async (req, res) => {

            let id = req.params.id;
            var sql = "update volunteer SET ? where id=?";
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
    function and route for update total session
    */

    let missionTotal = () => {
        app.put('/volunteerst/:id', async (req, res) => {

            let id = req.params.id; 
             var ST = req.body.ST;
            var sql = `update volunteer SET volunteer.totalmission=volunteer.totalmission+${ST} where id=${id}`;
          
            try {
                connection.con.query(sql, (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })

    }


      /*
    route and controller for update report a specific volunteer by id
    */
    let updatevolunteerR = () => {
        app.put('/volunteerr/:id', async (req, res) => {

            let id = req.params.id;
             var report = req.body.report;
            var sql = "update volunteer SET report = '"+report+"' where id="+id;
           
            try {
                connection.con.query(sql, (err, result) => {
                    res.json(result);
                });
            } catch (e) {
                res.send('error')
            }
        })
    }

    /*
    route and controller for delete a specific volunteer by id
    */
    let deletevolunteer = () => {
        app.delete('/volunteer/:id', async (req, res) => {
            let id = req.params.id;
            connection.con.query('delete from volunteer where id=' + id, (err, result) => {
                try {
                    res.json({ success: true, result: result });
                } catch (e) {
                    res.json({ success: false });

                }
            })
        });
    }

    deletevolunteer();
    createvolunteer();
    getvolunteers();
    updatevolunteer();
    getvolunteer();
    getvolunteerReport();
    missionTotal();
    updatevolunteerR();
    getvolunteerName();
}
module.exports = { volunteerCRUD };
// export function volunteerCRUD() {
//     throw new Error('Function not implemented.');
// }
