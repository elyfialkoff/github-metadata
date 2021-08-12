import express from "express";
import dotenv  from 'dotenv';
import { RepoMetadata } from './controllers/github-repo';

dotenv.config();

const app = express();
const POST = process.env.PORT;

app.get('/', async (req, res) => {
  // Do we need these two statements?
  const repoMetadata = await RepoMetadata.getRepoMetadata('elyfialkoff/github-metadata');
  if (repoMetadata.open_issues < 1) return "No Open Pull Requests in this Repository."

  const eventUrl = await RepoMetadata.getRepoEvents('elyfialkoff/github-metadata');
  const commits = await RepoMetadata.getCommitCountOnOpenPullRequests(eventUrl);
  res.send(commits)
});

app.listen(POST, () => {
  console.log(`Server running on port ${POST}`)
});