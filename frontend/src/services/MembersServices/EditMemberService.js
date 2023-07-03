import { MEMBERS_BASE_API_URL } from '@/config';
import axios from 'axios';

const EditMemberService = {
  async editMember(memberId, member) {
    const timestamp = new Date().getTime();
    let apiUrl;
    apiUrl = MEMBERS_BASE_API_URL;
    try {
      return await axios.put(
        apiUrl + '/' + memberId + `?timestamp=${timestamp}`,
        member,
      );
    } catch (error) {
      console.error('Error Editing the member:', error);
      throw error;
    }
  },
};

export default EditMemberService;
