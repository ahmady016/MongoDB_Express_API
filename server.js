
import express from 'express'
import cors from 'cors'

const PORT = process.env.PORT || 5000;
const server = express();

server.use(cors());

server.listen(PORT, () => {
  console.log(`server running at port:${PORT} \n${(new Date()).toLocaleString()}`);
});