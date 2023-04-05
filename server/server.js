import  express  from 'express';
import cors from 'cors';
import morgan from 'morgan';
require("dotenv").config()
const port = process.env.PORT || 8000;
require('./db/db');
const app = express();
const Register = require('./db/db');
app.use(express.json());
app.use(morgan('dev'))
app.use(cors({
    origin:["http://localhost:3000"]
}))
app.use(express.urlencoded({ extended: true }))
import {readdirSync} from 'fs'
readdirSync("./routes").map((r)=>app.use('/api',require(`./routes/${r}`)))
app.listen(port,console.log("Connection succedded at port 8000"))