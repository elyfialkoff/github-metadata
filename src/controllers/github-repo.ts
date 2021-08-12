const axios = require('axios').default

export module RepoMetadata {
  export const getRepoMetadata = async (repoUrl: string) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${repoUrl}`);
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

  export const getRepoEvents = async (repoUrl: string) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${repoUrl}`);
      return response.data.events_url
    } catch (error) {
      console.error(error);
    }
  }

  export const getCommitsOnOpenPullRequests = async (eventUrl: string) => {
    try {
      const response = await axios.get(eventUrl);
      
      const pullReqestEvents: any[] = getPullRequestEvents(response.data);
      const openPullRequests: {[key: string]: string} = getOpenPullReqestEvents(pullReqestEvents);
      
      return openPullRequests;
    } catch (error) {
      console.error(error);
    }
  }

  const getOpenPullReqestEvents = (events: any[]) => {
    const openPullRequestEvents: {[key: string]: string} = {};

    // If event.payload.pull_request.html_url is found twice in events, PR must be closed.
    events.forEach((event: any) => {
      if (!Object.keys(openPullRequestEvents).includes(event.payload.pull_request.html_url)) {
        openPullRequestEvents[event.payload.pull_request.html_url] = event.payload.pull_request.commits
      } else {
        delete openPullRequestEvents[event.payload.pull_request.html_url] 
      }
    })

    return openPullRequestEvents;
  }

  const getPullRequestEvents = (events: any[]) => {
    return events.filter((event: any) => {
      return event.type == "PullRequestEvent"
    })
  }
}