const mongoose = require('mongoose');
const { dbUser, dbPassword, dbHost, dbName } = require('../configs/db.config');

const mongoConnect = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`)
        console.log(' Connected to DB "MongoDB"');
    } catch (error) {
        console.error( 'Error Connected', error )
    }
    
}
module.exports = mongoConnect;