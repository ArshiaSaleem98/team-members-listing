<template>
  <div v-show="showModal" class="modal-container">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <FormComponent
        :label="label"
        @cancel="cancelForm"
        @teamAdded="handleTeamAdded"
        @memberAdded="handleMemberAdded"
      />
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
