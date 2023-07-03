import { MEMBERS_BASE_API_URL } from '@/config';
import axios from 'axios';

export default {
  deleteMember(memberId) {
    const timestamp = new Date().getTime();

    let apiUrl;
    apiUrl = MEMBERS_BASE_API_URL;
    return axios
      .delete(apiUrl + '/' + memberId + `?timestamp=${timestamp}`)
      .then((response) => {
        console.log('Member deleted successfully:', response);
      })
      .catch((error) => {
        console.error('Error in deleting the member:', error);
        throw error;
      });
  },
};
