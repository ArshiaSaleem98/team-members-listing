<template>
  <div class="container-padding" aria-labelledby="team-details-heading">
    <h4 id="team-details-heading" class="team-details">Team Details</h4>
    <div class="team-label">
      <span class="label-bold">Team Name:</span>
      <div class="team-name-wrapper">
        <div class="team-name">{{ title }}</div>
      </div>
    </div>
    <div class="team-label">
      <span class="label-bold">Team Members:</span>
      <div class="team-members-wrapper">
        <div
          v-if="item.teamMembers.length > 0"
          class="team-members"
          role="list"
        >
          {{ formatMembers(item.teamMembers) }}
        </div>
        <div v-else class="no-members-message">No team members found!!</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatMembers } from '@/utils/accordionMethods.js';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatMembers,
  },
};
</script>

<style scoped lang="scss">
@import './team-details-container';
</style>
