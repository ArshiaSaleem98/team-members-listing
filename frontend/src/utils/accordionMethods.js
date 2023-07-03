export function formatMembers(teamMembers) {
  const membersArray = teamMembers.split(',').map((member) => member.trim());
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
    teamItem.teamMembers,
  );
  return {
    ...teamItem,
    teamMembersArray,
    formattedMembers,
    showMore,
  };
}
