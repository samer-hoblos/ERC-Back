const bcrypt = require("bcryptjs"); //npm install bcryptjs --save
const jwt = require("jsonwebtoken");
const connection = require('../connection/DBConnection');
import app from '../app';
const Auth = async () => {


    const isLoggedIn = async (req, res, next) => {

       // 
        const token = req.body.token;
        if (!token) next(new Error("Auth Error"));

        try {

            const decoded = jwt.verify(token, "randomString");
    const id =req.body.id;
            if (id != decoded.id) next(new Error("Invalid Token1"));

            const statement = `SELECT id,username,email,token FROM admin WHERE token="${token}"`;
            connection.con.query(statement, (err, result) => {
  if (!result || !result[0].id || result[0].id != id) next(new Error("Invalid Token2"));

             req.id = decoded.id;
            req.result = result;
           

            next();
            })       

        } catch (e) {
            next(new Error("Invalid Token3"));
        }

    }

    const signupAction = async () => {
        // check body data
        app.post('/signup', async (req, res, nex) => {
            let { username, email, password } = req.body;

            if (!username || !password) throw new Error("Email and password are required");  
            try {
                let selectStmt = `SELECT id, username, email, password FROM admin WHERE username = "${username}"`;  
                connection.con.query(selectStmt, async (err, result) => {
                    if (result.length >= 1) throw new Error("User already exists");
                    let salt = await bcrypt.genSalt(10);
                    let hashedPassword = await bcrypt.hash(password, salt);
                    let insertStmt = 'INSERT INTO admin (username, email, password) VALUES (?, ?, ?)';

                    connection.con.query(insertStmt, [username, email, hashedPassword], (err, result) => {
                        let id = result && result.insertId;
                        console.log(id);
                        let payload = { id: id }; 
                        let token = jwt.sign(payload, "randomString", { expiresIn: 10000 });
                        console.log(token);
               
                        let obj = {
                            'token': token
                        }
                        let query = 'update admin SET ? where id=?';
                        connection.con.query(query, [obj, id], (err, result) => {
                            return { id, token, username, email };

                        })
                    });

                });
            } catch (e) {
                throw new Error(`couldn't create user ` + e.message);
            }
        })
    }

    const loginAction = async () => {
        app.post('/login', async (req, res) => {
            let { username, password } = req.body;
            if (!username || !password) throw new Error("username and password are required");
            try {
                let statement = `SELECT id, username, email, password FROM admin WHERE username = "${username}"`;
                connection.con.query(statement, async (err, result1) => {

                    if (result1.length === 0) console.log("User not found");
                    // check the password
                    let isMatch = await bcrypt.compare(password, result1[0].password);
                    if (!isMatch) throw new Error("Incorrect Password !");
                    // generate token
                    let payload = { id: result1[0].id };
             
                    let token = jwt.sign(payload, "randomString", { expiresIn: 10000 });
                    // add token to the user
                    let obj = {
                        'token': token
                    }
                    let query = 'update admin SET ? where id=?';
                    connection.con.query(query, [obj, result1[0].id], (err, result) => {
                     
                        res.send({id:result1[0].id,token});
                    })
                })
            } catch (e) {
               throw new Error(`couldn't login user ` + e.message);

            }
        })
    }

    const logoutAction = async () => {
        app.post('/logout',isLoggedIn,(req,res)=>{
            try{
                let query='UPDATE admin SET token = ? WHERE id = ?';
let obj={
    'token':null
}
let id=req.id;
connection.con.query(query,[obj,id],(err,result)=>{
    res.send("logged out successfully");
})
            }catch(e){
                 throw new Error(`couldn't logout user ` + e.message);
            }
        })
    }

    // isLoggedIn();
    signupAction();
    loginAction();
    logoutAction();



}
module.exports = { Auth };
// export function Auth() {
//     throw new Error('Function not implemented.');
// }

