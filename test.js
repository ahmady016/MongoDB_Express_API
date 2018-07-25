require("dotenv").config();
const startupLog = require('debug')('app:startup');
const dbLog = require("debug")("app:db");
const config = require("config");
import mongoose from "mongoose";
import express from "express";
import Author from './authors/author.model';

const PORT = process.env.PORT || config.get("port");
const app = express();

const buildQuery = (query) => {
  return query.split(')')
            .map(item => item.split('(')) // split each field
            .filter(item => item[0] !== "") // remove empty item
            .map(item => [item[0], item[1].split(',')]) // split to [fieldName, values]
            .reduce( (acc, item) => { // build the query object
              const [fieldName, values] = item;
              if(values.length === 1) { // in case of one query value by fieldName
                const keyVal = values[0].split(':'); // split [operator, value]
                (keyVal.length === 1)
                  ? acc[fieldName] = new RegExp(keyVal[0], 'i') // in case of regex build a regex
                  : acc[fieldName] = {
                    [keyVal[0]]: (keyVal[1].includes('|')) // in case of $in $nin
                                    ? keyVal[1].split('|')
                                    : keyVal[1]
                  }
              } else { // in case of many query values by fieldName
                acc[fieldName] = values.reduce( (ac, el) => {
                    const keyVal = el.split(':'); // split [operator, value]
                    if(keyVal.length === 2) {
                      ac[keyVal[0]] = (keyVal[1].includes('|')) // in case of $in $nin
                                        ? keyVal[1].split('|')
                                        : keyVal[1]
                      return ac;
                    }
                },{});
              }
              return acc
            },{});
}

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
  if(query && query.find) {
    find = buildQuery(query.find);
    dbLog(find)
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
