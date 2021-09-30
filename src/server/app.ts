import express from "express";
import * as pkg from '../../package.json';
const app = express();
app.set('pkg',pkg);
export default app;