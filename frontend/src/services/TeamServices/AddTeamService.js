import { TEAMS_BASE_API_URL } from '@/config';
import axios from 'axios';

export default {
  addTeam(team) {
    console.log('hola', team);
    const timestamp = new Date().getTime();
    let apiUrl;
    apiUrl = `${TEAMS_BASE_API_URL}?timestamp=${timestamp}`;
    return axios
      .post(apiUrl, {
        name: team.name,
      })
      .then((response) => response)
      .catch((error) => {
        console.error('Error adding the team:', error);
        throw error;
      });
  },
};
