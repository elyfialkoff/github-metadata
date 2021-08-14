const axios = require('axios').default

export module RepoMetadata {
  export const getRepoMetadata = async (repoUrl: string): Promise<any> => {
    try {
      const response = await axios.get(repoUrl);
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

  export const getCommitCountOnOpenPullRequests = async (eventUrl: string) => {
    try {
      const response = await axios.get(eventUrl);
      
      const pullReqestEvents: any[] = filterPullRequestEvents(response.data);
      const openPullRequests: {[key: string]: string} = getOpenPullRequestEventCommitUrls(pullReqestEvents);

      const commitCountOnPullRequests: {[key: string]: string} = await getCommitCountOnPullRequests(openPullRequests)
      
      return commitCountOnPullRequests;
    } catch (error) {
      console.error(error);
    }
  }

  const getCommitCountOnPullRequests = async (openPullRequests: {[key: string]: string}) => {
    try {
      const commitCountOnOpenPullRequests: {[key: string]: string} = {}; 
      for (const [html_url, commits_url] of Object.entries(openPullRequests)) {
        const response = await axios.get(commits_url);
        commitCountOnOpenPullRequests[html_url] = response.data.length;
      }
      return commitCountOnOpenPullRequests
    } catch (error) {
      console.error(error);
    }
  }

  const getOpenPullRequestEventCommitUrls = (events: any[]) => {
    const openPullRequestEvents: {[key: string]: string} = {};

    // If event.payload.pull_request.html_url is found twice in events, PR must be closed.
    events.forEach((event: any) => {
      const pullRequest = event.payload.pull_request
      if (!Object.keys(openPullRequestEvents).includes(pullRequest.html_url)) {
        openPullRequestEvents[pullRequest.html_url] = pullRequest.commits_url
      } else {
        delete openPullRequestEvents[pullRequest.html_url] 
      }
    })

    return openPullRequestEvents;
  }

  const filterPullRequestEvents = (events: any[]) => {
    return events.filter((event: any) => {
      return event.type == "PullRequestEvent"
    })
  }
}