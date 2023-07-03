import GetAllTeamsService from '@/services/TeamServices/GetAllTeamsService.js';
import GetAllTeamMembers from '@/services/TeamServices/GetAllTeamMembers.js';
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
      teams.map((team) => GetAllTeamMembers.getMembersOfTeam(team.id)),
    );

    const accordionItems = membersOfTeams.map((members, index) => {
      console.log('index', index);
      const team = teams.find((team) => team.id === members[0].teamId);
      return {
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
