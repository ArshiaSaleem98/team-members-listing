<template>
  <div class="container-padding">
    <h2 class="team-details">Team Details</h2>
    <div class="team-label">
      <span class="label-bold">Team Name:</span>
      <div class="team-name-wrapper">
        <div class="team-name">{{ title }}</div>
      </div>
    </div>
    <div class="team-label">
      <span class="label-bold">Team Members:</span>
      <div class="team-members-wrapper">
        <div class="team-members">
          {{ item.formattedMembers }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
@import './team-details-container';
</style>
