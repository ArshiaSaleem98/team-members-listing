import { TEAMS_BASE_API_URL } from '@/config';
import axios from 'axios';

export default {
  deleteTeam(teamId) {
    const timestamp = new Date().getTime();

    let apiUrl;
    apiUrl = TEAMS_BASE_API_URL;
    return axios
      .delete(apiUrl + '/' + teamId + `?timestamp=${timestamp}`)
      .then((response) => response)
      .catch((error) => {
        console.error('Error in deleting the team:', error);
        throw error;
      });
  },
};
