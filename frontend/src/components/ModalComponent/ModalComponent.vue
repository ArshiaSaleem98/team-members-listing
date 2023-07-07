<template>
  <div v-show="showModal" class="modal-container" aria-label="Modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ title }}</h2>
      </div>
      <div class="modal-content-wrapper">
        <FormComponent
          :label="label"
          :teams-array="teamsArray"
          @cancel="cancelForm"
          @team-added="handleTeamAdded"
          @member-added="handleMemberAdded"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormComponent from '@/components/FormComponent/FormComponent.vue';

export default {
  name: 'ModalComponent',
  components: {
    FormComponent,
  },
  props: {
    teamsArray: {
      type: Array,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['teamAdded', 'memberAdded', 'close-modal'],
  methods: {
    toggleModal() {
      this.$emit('close-modal');
    },
    cancelForm() {
      this.toggleModal();
    },
    handleTeamAdded(teamData) {
      this.$emit('teamAdded', teamData);
    },
    handleMemberAdded(memberData) {
      this.$emit('memberAdded', memberData);
      this.cancelForm();
    },
  },
};
</script>

<style scoped lang="scss">
@import './modal-component';
</style>
