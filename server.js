require('dotenv').config();
const config = require('config')
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

const PORT = process.env.PORT || config.get("port");
const app = express();

// mongoose.connect(process.env.GOOGLE_BOOKS_DB_URL)
//         .then(() => console.log('connected to google_books db ...'))
//         .catch(err => console.error(err.message))

mongoose.connect(config.get("db.test"))
        .then(() => console.log('connected to test db ...'))
        .catch(err => console.error(err.message))

app.use(cors());

app.listen(PORT, () => {
  console.log(`server running at port:${PORT} \n${(new Date()).toLocaleString()}`);
});