import express from "express";
import dotenv  from 'dotenv';
import { RepoMetadata } from './controllers/github-repo';

dotenv.config();

const app = express();
const POST = process.env.PORT;

app.get('/', async (req, res) => {
  // Change html url into api url
  const apiUrl = req.query.repoUrl.toString().replace('https://github.com', 'https://api.github.com/repos');
  
  const repoMetadata = await RepoMetadata.getRepoMetadata(apiUrl);
  let commits: any = {}
  if (repoMetadata.open_issues > 0) {
    commits = await RepoMetadata.getCommitCountOnOpenPullRequests(repoMetadata.eventUrl);
  }
  res.send(commits)
});

app.listen(POST, () => {
  console.log(`Server running on port ${POST}`)
});