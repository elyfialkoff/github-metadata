import express from "express";
import dotenv  from 'dotenv';
import { RepoMetadata } from './controllers/github-repo';

dotenv.config();

const app = express();
const POST = process.env.PORT;

app.get('/', async (req, res) => {
  const metadata = await RepoMetadata.getRepoMetadata('elyfialkoff/github-metadata');
  console.log(metadata)
  res.send(metadata)
});

app.listen(POST, () => {
  console.log(`Server running on port ${POST}`)
});