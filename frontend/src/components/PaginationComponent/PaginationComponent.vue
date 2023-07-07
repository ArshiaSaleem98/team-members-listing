<template>
  <div class="pagination">
    <button
      v-if="currentPage > 1"
      class="pagination-item pagination-prev"
      aria-label="Previous Page"
      @click="changePage(currentPage - 1)"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      class="pagination-item"
      :class="{ active: currentPage === page }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button
      v-if="currentPage < totalPages"
      class="pagination-item pagination-next"
      aria-label="Next Page"
      @click="changePage(currentPage + 1)"
    >
      <i class="fas fa-chevron-right"></i>
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
  emits: ['page-change'],
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
