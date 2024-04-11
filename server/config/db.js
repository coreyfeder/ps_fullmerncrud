if (process.env.MODE != "production" ) {
    require("dotenv").config();
}

const mongoose = require('mongoose');

let connectString = `mongodb+srv://` +                                          // protocol. is the "+srv" necessary?
                    `${encodeURIComponent(process.env.MDB_USERNAME)}` +         // auth: username
                    `:${encodeURIComponent(process.env.MDB_APIKEY)}` +          // auth: pw, auth token, etc.
                    `@${process.env.MDB_APPNAME}.${process.env.MDB_APPID}` +    // server subdomain
                    `.${process.env.MDB_SERVER}` +                              // base server name
                    `/${process.env.MDB_DATABASE}`                              // any "path"

// -> mongodb+srv://{USERNAME}:{APIKEY}@{APPNAME}.{APPID}.{SERVER}/{DATABASE}
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
