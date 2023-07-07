<template>
  <div class="delete-modal">
    <div class="delete-modal__content">
      <p v-html="message"></p>
      <div class="delete-modal__buttons">
        <button
          class="delete-modal__button-delete"
          aria-label="Delete"
          @click="deleteTeam"
        >
          Delete
        </button>
        <button
          class="delete-modal__button-cancel"
          aria-label="Cancel"
          @click="cancelDelete"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
  },
  emits: ['delete-team', 'cancel-delete'],

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
