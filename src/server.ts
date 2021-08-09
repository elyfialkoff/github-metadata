import express from "express";
import dotenv  from 'dotenv';

dotenv.config();

const app = express();
const POST = process.env.PORT;

app.get('/', (req, res) => {
  res.send('testing')
});

app.listen(POST, () => {
  console.log(`Server running on port ${POST}`)
});