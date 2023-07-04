import GetAllTeamsService from '@/services/TeamServices/GetAllTeamsService.js';
import GetAllTeamMembersService from '@/services/TeamServices/GetAllTeamMembersService.js';
import DeleteTeamService from '@/services/TeamServices/DeleteTeamService';
import EditTeamService from '@/services/TeamServices/EditTeamService';
import DeleteMemberService from '@/services/MemberServices/DeleteMemberService';
import EditMemberService from '@/services/MemberServices/EditMemberService';
import AddTeamService from '@/services/TeamServices/AddTeamService';
import AddMemberService from '@/services/MemberServices/AddMemberService';

export function formatMembers(teamMembers) {
  console.log('members', teamMembers);
  const membersArray = Object.values(teamMembers);
  const lastMember = membersArray[membersArray.length - 1];
  const formattedMembers =
    membersArray.length > 1
      ? membersArray.slice(0, -1).join(', ') + ' & ' + lastMember
      : lastMember;
  return {
    teamMembersArray: membersArray,
    formattedMembers,
    showMore: false,
  };
}

export function formatAccordionTeamItem(teamItem) {
  const { teamMembersArray, formattedMembers, showMore } = formatMembers(
    teamItem.teamMembersArray,
  );
  return {
    ...teamItem,
    teamMembersArray,
    formattedMembers,
    showMore,
  };
}

export async function getTeams(component) {
  try {
    const teams = await GetAllTeamsService.getTeams();
    console.log('Teams fetched successfully:', teams);
    component.teams = teams.map((team) => ({
      id: team.id,
      name: team.name,
    }));
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
}

export async function fetchTeamsAndMembers() {
  try {
    const teams = await GetAllTeamsService.getTeams();
    console.log('teams', teams);

    const membersOfTeams = await Promise.all(
      teams.map((team) => GetAllTeamMembersService.getMembersOfTeam(team.id)),
    );

    const accordionItems = membersOfTeams.map((members, index) => {
      console.log('index', index);
      const teamId = members.length > 0 ? members[0].teamId : teams[index]?.id;
      const team = teams.find((team) => team.id === teamId);
      const teamMembers = members || [];
      const teamName = team && team.name ? team.name : '';

      return {
        id: teamId,
        title: teamName,
        open: false,
        teamName: teamName,
        teamMembers: teamMembers,
        teamMembersArray: teamMembers.map((member) => member.name),
      };
    });

    return accordionItems.map(formatAccordionTeamItem);
  } catch (error) {
    console.error('Error fetching teams and members:', error);
    return [];
  }
}

export async function addTeam(component, data) {
  try {
    const response = await AddTeamService.addTeam(data);
    console.log('Team added successfully:', response);
    component.$emit('teamAdded', response.data);
    component.clearForm();
    component.$emit('cancel');
    getTeams(component);
  } catch (error) {
    console.error('Error adding the team:', error);
    throw error;
  }
}

export function deleteTeam(teamId) {
  DeleteTeamService.deleteTeam(teamId)
    .then((response) => response)
    .catch((error) => {
      console.error('Error in deleting the team:', error);
    });
}

export function editTeam(teamId, editedData, fetchTeamsAndMembers) {
  console.log('editedTeam', teamId, editedData);
  EditTeamService.editTeam(teamId, editedData)
    .then((response) => {
      console.log('Team successfully Edited:', response);
      fetchTeamsAndMembers();
    })
    .catch((error) => {
      console.error('Error in editing the team:', error);
    });
}

export async function addMember(component, data) {
  try {
    const response = await AddMemberService.addMember(data);
    console.log('Member added successfully:', response);
    component.$emit('memberAdded', response.data);
    component.clearForm();
  } catch (error) {
    console.error('Error adding the Member:', error);
    throw error;
  }
}

export function deleteMember(memberId) {
  console.log('delte', memberId);
  DeleteMemberService.deleteMember(memberId)
    .then((response) => {
      console.log('Member deleted successfully:', response);
    })
    .catch((error) => {
      console.error('Error in deleting the team:', error);
    });
}

export function editMember(memberId, editedData) {
  console.log('edit', memberId);
  EditMemberService.editMember(memberId, editedData)
    .then((response) => {
      console.log('Member edited successfully:', response);
    })
    .catch((error) => {
      console.error('Error in editing the member:', error);
    });
}
