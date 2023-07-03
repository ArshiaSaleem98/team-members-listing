import { TEAMS_BASE_API_URL } from '@/config';
import axios from 'axios';

const EditTeamService = {
  async editTeam(teamId, team) {
    const timestamp = new Date().getTime();
    let apiUrl;
    apiUrl = TEAMS_BASE_API_URL;
    try {
      return await axios.put(
        apiUrl + '/' + teamId + `?timestamp=${timestamp}`,
        team,
      );
    } catch (error) {
      console.error('Error Editing the team:', error);
      throw error;
    }
  },
};

export default EditTeamService;
