import mongoose  from "mongoose";

const domain="localhost";
const dataBaseName="r2_security";

const MONGO_URI='mongodb://'+domain+"/"+dataBaseName;
mongoose.connect(MONGO_URI)
    .then(db=>console.log("DB is connected"))
    .catch(error=>console.log(error));