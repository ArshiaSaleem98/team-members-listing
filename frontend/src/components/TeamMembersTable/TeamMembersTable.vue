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
          <td>
            <input
              v-if="teamMember.editing"
              v-model="teamMember.name"
              type="text"
            />
            <span v-else>{{ teamMember.name }}</span>
          </td>
          <td>
            <button
              v-if="!teamMember.editing"
              class="member-edit-button"
              @click="editMemberMethod(teamMember)"
            >
              Edit
            </button>
            <button
              v-else
              class="member-save-button"
              @click="saveMember(teamMember)"
            >
              Save
            </button>
            <button
              class="member-delete-button"
              @click="deleteMember(teamMember.id, fetchTeamsAndMembers)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { deleteMember, editMember } from '@/utils/accordionMethods.js';

export default {
  props: {
    displayedMembers: {
      type: Array,
      required: true,
    },

    fetchTeamsAndMembers: {
      type: Function,
      required: true,
    },
  },
  methods: {
    deleteMember,
    editMember,
    editMemberMethod(member) {
      member.editing = true;
    },
    saveMember(member) {
      console.log(member);
      editMember(member.id, member);
      member.editing = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import './team-members-table';
</style>
