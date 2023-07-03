import GetAllTeamsService from '@/services/TeamServices/GetAllTeamsService.js';
import GetAllTeamMembersService from '@/services/TeamServices/GetAllTeamMembersService.js';
import DeleteTeamService from '@/services/TeamServices/DeleteTeamService';

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

export async function fetchTeamsAndMembers() {
  try {
    const teams = await GetAllTeamsService.getTeams();
    console.log('teams', teams);
    const membersOfTeams = await Promise.all(
      teams.map((team) => GetAllTeamMembersService.getMembersOfTeam(team.id)),
    );

    const accordionItems = membersOfTeams.map((members, index) => {
      console.log('index', index);
      const team = teams.find((team) => team.id === members[0].teamId);
      return {
        id: team.id,
        title: team.name,
        open: false,
        teamName: team.name,
        teamMembersArray: members.map((member) => member.name),
      };
    });

    return accordionItems;
  } catch (error) {
    console.error('Error fetching teams and members:', error);
    return [];
  }
}

export function deleteTeam(teamId) {
  DeleteTeamService.deleteTeam(teamId)
    .then((response) => {
      console.log('Team deleted successfully:', response);
      this.fetchTeamsAndMembers();
    })
    .catch((error) => {
      console.error('Error in deleting the team:', error);
    });
}
