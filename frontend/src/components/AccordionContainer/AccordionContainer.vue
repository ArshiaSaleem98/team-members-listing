<template>
  <div class="accordion">
    <div
      v-for="(item, index) in accordionItems"
      :key="index"
      class="accordion-item"
      :class="{ 'accordion-item--active': item.open }"
    >
      <div class="accordion-item__header" @click="toggleItem(index)">
        {{ item.title }}
        <span class="accordion-icon" :class="{ open: item.open }">
          &#x25BE;
        </span>
      </div>
      <div
        v-if="item.open"
        class="accordion-item__content"
        :class="{ open: item.open }"
      >
        <div
          class="accordion-item__left-container"
          :class="{ 'accordion-item__left-container--mobile': isMobile }"
        >
          <TeamDetailsContainer
            :item="item"
            :fetch-teams-and-members="fetchTeamsAndMembers"
          ></TeamDetailsContainer>
        </div>
        <div
          class="accordion-item__right-container"
          :class="{ 'accordion-item__right-container--mobile': isMobile }"
        >
          <div class="container-padding">
            <h2 class="team-members-title">Team Members</h2>
            <team-members-table
              :displayed-members="displayedMembers(item)"
            ></team-members-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  formatAccordionTeamItem,
  fetchTeamsAndMembers,
} from '@/utils/accordionMethods.js';
import TeamMembersTable from '@/components/TeamMembersTable/TeamMembersTable.vue';
import TeamDetailsContainer from '@/components/TeamDetailsContainer/TeamDetailsContainer.vue';

export default {
  components: {
    TeamMembersTable,
    TeamDetailsContainer,
  },
  data() {
    return {
      teams: [],
      accordionItems: [],
    };
  },

  computed: {
    displayedMembers() {
      return (item) => {
        if (item.teamMembersArray) {
          console.log('itemMember', item.teamMembersArray);
          return item.teamMembersArray;
        }
        return [];
      };
    },
  },
  mounted() {
    this.fetchTeamsAndMembers();
  },
  methods: {
    toggleItem(index) {
      this.accordionItems.forEach((item, i) => {
        if (i === index) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
      });
    },

    async fetchTeamsAndMembers() {
      try {
        const accordionItems = await fetchTeamsAndMembers();
        this.accordionItems = accordionItems.map(formatAccordionTeamItem);
      } catch (error) {
        console.error('Error fetching teams and members:', error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import './accordion-container';
</style>
