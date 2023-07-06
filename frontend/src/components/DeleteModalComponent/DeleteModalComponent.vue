<template>
  <div class="delete-modal">
    <div class="delete-modal__content">
      <p>Are you sure you want to delete this team?</p>
      <div class="delete-modal__buttons">
        <button class="delete-modal__button" @click="deleteTeam">Delete</button>
        <button class="delete-modal__button" @click="cancelDelete">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemId: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
  },
  methods: {
    deleteTeam() {
      this.$emit('delete-team', this.itemId, this?.index);
    },
    cancelDelete() {
      this.$emit('cancel-delete');
    },
  },
};
</script>

<style scoped lang="scss">
@import './delete-modal-component';
</style>
