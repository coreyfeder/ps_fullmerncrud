if (process.env.MODE != "production" ) {
    require("dotenv").config();
}

const mongoose = require('mongoose');

// MongoDB connection elements
// const REGION="us-east-1.aws"
const DB_PREFIX = "mongodb+srv"
const DB_APPNAME = "honeynutcluster"
const DB_APPID = "71qzsuw"
const DB_SERVERROOT = "mongodb.net"
const DB_DATABASE = "fullcrud"

const DB_USERNAME = encodeURIComponent(process.env.MDB_USERNAME)
const DB_PASSWORD = encodeURIComponent(process.env.MDB_PASSWORD)

const DB_AUTHSTRING = `${DB_USERNAME}:${DB_PASSWORD}`
const DB_SERVER = [DB_APPNAME, DB_APPID, DB_SERVERROOT].join(".")

const connectString = `${DB_PREFIX}://${DB_AUTHSTRING}@${DB_SERVER}/${DB_DATABASE}`

// console.debug("DEBUG: connectString: " + connectString)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connectString)
        console.log(`mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`DEBUG: DB Connection Failed!`)
        console.log(`error ${error.message}`)
    }
}

// export default connectDB  // not with Common style
module.exports = connectDB;

/*
// If we are only making a conneciton one time, how do we access different collections?
// is this valid syntax?
let targetCollection = 'test';
await mongoose.connect(connectString, {'collection': targetCollection});
// clues here? unlikely, unless db and collection both named cluster0
// const CONNECTION_URL =
//   "mongodb+srv://ariestitt:mokube123@cluster0.jozbiey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 */
