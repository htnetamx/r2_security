import mongoose  from "mongoose";

//DataBase Name
const dataBaseName="r2_security";

//Local
const domain="localhost";
const MONGO_URI='mongodb://'+domain+"/"+dataBaseName;

//Docker
//const MONGO_URI='mongodb:'+dataBaseName;
console.log("Running Database.js");
mongoose.connect(MONGO_URI)
    .then(db=>console.log("DB is connected"))
    .catch(error=>console.log(error));