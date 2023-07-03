<template>
  <div class="container-padding">
    <h2 class="team-details">Team Details</h2>
    <div class="team-label">
      <span class="label-bold">Team Name:</span>
      <div class="team-name">{{ item.teamName }}</div>
    </div>
    <div class="team-label">
      <span class="label-bold">Team Members:</span>
      <div class="team-members-wrapper">
        <div class="team-members">
          {{ item.formattedMembers }}
        </div>
      </div>
    </div>
    <div class="button-group">
      <button class="edit-button" @click="editTeam">Edit</button>
      <button class="delete-button" @click="deleteTeam(item.id)">Delete</button>
      <button class="add-member-button" @click="addMember">Add Member</button>
    </div>
  </div>
</template>

<script>
import { deleteTeam } from '@/utils/accordionMethods.js';
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    fetchTeamsAndMembers: {
      type: Function,
      required: true,
    },
  },
  methods: {
    editTeam() {
      // Handle the edit button click event
      console.log('Edit button clicked');
      // Perform the desired actions for editing the team
    },
    deleteTeam,
    addMember() {
      // Handle the add member button click event
      console.log('Add member button clicked');
      // Perform the desired actions for adding a team member
    },
  },
};
</script>

<style scoped lang="scss">
@import './team-details-container';
</style>
