require("dotenv").config();
const startupLog = require('debug')('app:startup');
const dbLog = require("debug")("app:db");
const config = require("config");
import mongoose from "mongoose";
import express from "express";
import Author from './authors/author.model';

const PORT = process.env.PORT || config.get("port");
const app = express();

mongoose
  .connect(config.get("db.google_books"),{ useNewUrlParser: true })
  .then(() => dbLog("connected to google_books db ..."))
  .catch(err => dbLog(err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// define app routes start
app.get('/authors', async (req, res) => {
  let find = {},
      skip = 0,
      limit = 0,
      sort = "",
      select = "",
      result;
  const {query} = req;

  if(query && query.id) {
    find = {_id: query.id};
  }
  if(query && query.page) {
    const [ pageNumber, pageSize ] = query.page.split(',').map(Number);
    skip = (pageNumber-1)*pageSize;
    limit = pageSize;
  }
  if(query && query.sort) {
    sort = query.sort;
  }
  if(query && query.select) {
    select = query.select;
  }
  result = await Author
                    .find(find)
                    .skip(skip)
                    .limit(limit)
                    .sort(sort)
                    .select(select);
  res.json(result);
});
// define app routes end
app.listen(PORT, () => {
  startupLog(
    `server running at: ${config.get("address")}:${PORT}
${new Date().toLocaleString()}`
  );
});
