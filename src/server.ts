import express from "express";
import dotenv  from 'dotenv';
import { RepoMetadata } from './controllers/github-repo';

dotenv.config();

const app = express();
const POST = process.env.PORT;

app.get('/', async (req, res) => {
  const eventUrl = await RepoMetadata.getRepoEvents('elyfialkoff/github-metadata');
  const commits = await RepoMetadata.getCommitsOnOpenPullRequests(eventUrl);
  res.send(commits)
});

app.listen(POST, () => {
  console.log(`Server running on port ${POST}`)
});