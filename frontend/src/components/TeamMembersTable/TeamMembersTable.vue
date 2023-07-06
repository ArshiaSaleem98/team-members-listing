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
          v-for="(teamMember, teamMemberIndex) in localMembers"
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
              @click="showDeleteConfirmation(teamMember.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <DeleteModalComponent
        v-if="showDeleteModal"
        :item-id="memberToDeleteId"
        @delete-team="deleteMemberMethod"
        @cancel-delete="cancelDelete"
      ></DeleteModalComponent>
    </table>
  </div>
</template>

<script>
import { deleteMember, editMember } from '@/utils/accordionMethods.js';
import DeleteModalComponent from '@/components/DeleteModalComponent/DeleteModalComponent.vue';

export default {
  components: {
    DeleteModalComponent,
  },
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
  data() {
    return {
      localMembers: [],
      memberToDeleteId: '',
      showDeleteModal: false,
    };
  },
  created() {
    this.localMembers = [...this.displayedMembers];
  },
  methods: {
    deleteMember,
    editMember,
    showDeleteConfirmation(memberId) {
      console.log('m', memberId);
      this.memberToDeleteId = memberId;
      this.showDeleteModal = true;
    },

    deleteMemberMethod(memberId) {
      const index = this.localMembers.findIndex(
        (member) => member.id === memberId,
      );
      if (index !== -1) {
        this.localMembers.splice(index, 1);
      }
      deleteMember(memberId);
      this.$emit('delete-member', memberId);
      this.cancelDelete();
    },
    editMemberMethod(member) {
      member.editing = true;
    },
    saveMember(member) {
      console.log(member);
      editMember(member.id, member);
      member.editing = false;
    },
    cancelDelete() {
      this.showDeleteModal = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import './team-members-table';
</style>
