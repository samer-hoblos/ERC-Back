import app from './app'

const volunteerCRUD = require('./routes/volunteerCRUDRoute');
const missionCRUD = require('./routes/missionCRUDRoute');
const carCRUD = require('./routes/carCRUDRoute');
const adminCRUD = require('./routes/adminCRUDRoute');
const auth = require('./auth/controller');
const teamCRUD = require('./routes/teamCRUDRoute')

adminCRUD.adminCRUD();
auth.Auth();
carCRUD.carCRUD();
missionCRUD.missionCRUD();
volunteerCRUD.volunteerCRUD();
teamCRUD.teamCRUD();
/*
fast testing the server in the loading
*/
app.get('/',(req,res)=>res.send('okay'));
app.listen( 8080, () => console.log('server listening on port 8080') )
