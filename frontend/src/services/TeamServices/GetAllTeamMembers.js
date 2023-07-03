import { TEAMS_BASE_API_URL } from '@/config';
import axios from 'axios';

export default {
  getMembersOfTeam(teamId) {
    const timestamp = new Date().getTime();
    let apiUrl;
    apiUrl = `${TEAMS_BASE_API_URL}/members/`;

    return axios
      .get(apiUrl + '/members' + `?timestamp=${timestamp}`, {
        id: Number(teamId),
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error in getting the members:', error);
        throw error;
      });
  },
};
