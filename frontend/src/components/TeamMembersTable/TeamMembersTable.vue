<template>
  <div class="team-members-table-wrapper">
    <table class="team-members-table">
      <thead>
        <tr>
          <th>Member</th>
          <th>Member Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(teamMember, teamMemberIndex) in displayedMembers"
          :key="teamMemberIndex"
        >
          <td>{{ teamMember }}</td>
          <td>
            <button class="member-edit-button">Edit</button>
            <button class="member-delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    displayedMembers: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import './team-members-table';
</style>
