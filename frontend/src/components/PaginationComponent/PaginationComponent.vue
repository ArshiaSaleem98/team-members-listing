<template>
  <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      class="pagination-item"
      :class="{ active: currentPage === page }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      this.$emit('page-change', page);
    },
  },
};
</script>

<style scoped lang="scss">
@import './pagination-component';
</style>
