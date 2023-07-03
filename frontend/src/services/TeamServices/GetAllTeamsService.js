import { TEAMS_BASE_API_URL } from '@/config';
import axios from 'axios';

export default {
  getTeams() {
    const timestamp = new Date().getTime();

    let apiUrl;
    apiUrl = `${TEAMS_BASE_API_URL}?timestamp=${timestamp}`;

    return axios
      .get(apiUrl)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching the teams:', error);
        throw error;
      });
  },
};
