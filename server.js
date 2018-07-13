require('dotenv').config()
const startupLog = require('debug')('app:startup')
const dbLog = require('debug')('app:db')
const config = require('config')
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

const PORT = process.env.PORT || config.get("port");
const app = express();

mongoose.connect(config.get("db.test"))
        .then(() => dbLog('connected to test db ...'))
        .catch(err => dbLog(err.message))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// define app routes start

// define app routes end
app.use(express.static('public'));
app.listen(PORT, () => {
  startupLog(`server running on: ${config.get("address")}:${PORT} - at: ${(new Date()).toLocaleString()}`);
});