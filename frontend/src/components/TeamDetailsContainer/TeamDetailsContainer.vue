<template>
  <div class="container-padding">
    <h2 class="team-details">Team Details</h2>
    <div class="team-label">
      <span class="label-bold">Team Name:</span>
      <div class="team-name-wrapper">
        <div v-if="!editing" class="team-name">{{ editedTeamName }}</div>
        <input v-else v-model="editedTeamName" class="team-name-edit" />
      </div>
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
      <button v-if="!editing" class="edit-button" @click="startEditing">
        Edit
      </button>
      <button v-else class="save-button" @click="saveTeam">Save</button>
    </div>
  </div>
</template>

<script>
import { editTeam } from '@/utils/accordionMethods.js';

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
  data() {
    return {
      editing: false,
      editedTeamName: this.item.teamName,
    };
  },
  methods: {
    editTeam,
    startEditing() {
      this.editing = true;
      this.editedTeamName = this.item.teamName;
    },
    saveTeam() {
      const editedTeam = {
        id: this.item.id,
        name: this.editedTeamName,
      };
      editTeam(this.item.id, editedTeam, this.fetchTeamsAndMembers);
      this.editing = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import './team-details-container';
</style>
