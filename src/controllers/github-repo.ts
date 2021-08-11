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
}