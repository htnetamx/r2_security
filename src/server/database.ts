import mongoose  from "mongoose";
const username=process.env.DATABASE_USER || '';
const password=process.env.DATABASE_PASSWORD || '';
const host=process.env.DATABASE_HOST|| 'localhost';
const port=process.env.DATABASE_PORT || '27017';
const database=process.env.DATABASE_NAME || 'r2_security';

async function mongooseConnect() : Promise<string> {
    var auth;
    (username) ? (password) ? auth=username+':'+password + '@' : auth='' : auth='';
    const MONGO_URI='mongodb://'+auth+host+':'+port+'/'+database;
    await mongoose.connect(MONGO_URI);
    return MONGO_URI;
 }

export default {mongooseConnect}
