import { MEMBERS_BASE_API_URL } from '@/config';
import axios from 'axios';

export default {
  addMember(member) {
    const timestamp = new Date().getTime();
    let apiUrl;
    apiUrl = `${MEMBERS_BASE_API_URL}?timestamp=${timestamp}`;
    return axios
      .post(apiUrl, {
        name: member.name,
        teamId: member.teamId,
      })
      .then((response) => response)
      .catch((error) => {
        console.error('Error adding the member:', error);
        throw error;
      });
  },
};
