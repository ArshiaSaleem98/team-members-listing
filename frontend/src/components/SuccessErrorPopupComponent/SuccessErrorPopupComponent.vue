<template>
  <div v-if="isVisible" class="popup-modal" :class="{ show: showCustomModal }">
    <span :class="type">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    showCustomModal: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    if (this.showCustomModal) {
      setTimeout(() => {
        this.isVisible = false; // Hide the modal after a certain duration
      }, 2000);
    }
  },
};
</script>

<style scoped>
.popup-modal {
  position: absolute;
  right: -10px;
  width: 100%; /* Set width to 100% */
  max-width: 500px; /* Add a maximum width if needed */
  border-radius: 20px 0 0 20px;
  border: 3px solid red;
  background-color: lightcoral;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: width 70s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.popup-modal.show {
  right: 0;
  width: 100%; /* Set width to 100% */
  height: 65px;
}

.modal-content {
  width: 100%;
  border: 3px solid #ff9999;
  border-left-width: 0;
  border-radius: 0 4px 4px 0;
  background-color: red;
  padding: 20px;
}

.error {
  background-color: red;
}

.success {
  background-color: green;
}

.warning {
  color: yellow;
}

@media (max-width: 500px) {
  .popup-modal {
    right: 0;
    left: 10px; /* Adjust the left margin for mobile */
    width: calc(100% - 20px); /* Subtract the margin from the width */
  }
}
</style>
