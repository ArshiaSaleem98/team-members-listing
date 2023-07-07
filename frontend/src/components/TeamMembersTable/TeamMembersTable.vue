<template>
  <div class="team-members-table-wrapper">
    <table v-if="localMembers.length" class="team-members-table" role="table">
      <thead>
        <tr>
          <th scope="col">Member</th>
          <th scope="col">Member Action</th>
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
              role="textbox"
              aria-label="Edit Member Name"
            />
            <span v-else>{{ teamMember.name }}</span>
          </td>
          <td>
            <button
              v-if="!teamMember.editing"
              class="member-edit-button"
              role="button"
              aria-label="Edit Member"
              @click="editMemberMethod(teamMember)"
            >
              Edit
            </button>
            <button
              v-else
              class="member-save-button"
              role="button"
              aria-label="Save Member"
              @click="saveMember(teamMember)"
            >
              Save
            </button>
            <button
              class="member-delete-button"
              role="button"
              aria-label="Delete Member"
              @click="setMemberToDelete(teamMember)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <DeleteModalComponent
        v-if="showDeleteModal"
        :message="deleteModalMessage"
        :item-id="memberToDeleteId"
        @delete-team="deleteMemberMethod"
        @cancel-delete="cancelDelete"
      ></DeleteModalComponent>
    </table>
    <div v-if="localMembers.length === 0" class="message-wrapper">
      <p class="no-members-message">No team members found !!</p>
    </div>
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
  emits: ['delete-member'],
  data() {
    return {
      localMembers: [],
      memberToDeleteId: '',
      showDeleteModal: false,
      memberToDelete: null,
    };
  },
  computed: {
    deleteModalMessage() {
      if (this.memberToDelete) {
        return `Are you sure you want to delete member <strong>${this.memberToDelete}</strong>?`;
      }
      return '';
    },
  },
  created() {
    this.localMembers = [...this.displayedMembers];
  },
  methods: {
    deleteMember,
    editMember,
    setMemberToDelete(member) {
      this.memberToDelete = member.name;
      this.memberToDeleteId = member.id;
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
      editMember(member.id, member);
      member.editing = false;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.memberToDelete = null;
    },
  },
};
</script>

<style scoped lang="scss">
@import './team-members-table';
</style>
