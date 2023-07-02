<template>
  <div class="accordion">
    <div
      v-for="(item, index) in accordionItemsWithArray"
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
          <TeamDetailsContainer :item="item"></TeamDetailsContainer>
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
import TeamMembersTable from '@/components/TeamMembersTable/TeamMembersTable.vue';
import TeamDetailsContainer from '@/components/TeamDetailsContainer/TeamDetailsContainer.vue';

export default {
  components: {
    TeamMembersTable,
    TeamDetailsContainer,
  },
  data() {
    return {
      accordionItems: [
        {
          title: 'Team A',
          open: false,
          teamName: 'Team A',
          teamMembers:
            'Member 1, Member 2, Member 3, Member 4, Member 5, Member 6, Member 7, Member 8',
        },
        {
          title: 'Team B',
          open: false,
          teamName: 'Team B',
          teamMembers:
            'Member 9, Member 10, Member 11, Member 12, Member 13, Member 14, Member 15, Member 16',
        },
      ],
    };
  },
  computed: {
    displayedMembers() {
      return (item) => {
        if (item.teamMembersArray) {
          return item.teamMembersArray;
        }
        return [];
      };
    },
    accordionItemsWithArray() {
      return this.accordionItems.map((item) => {
        const membersArray = item.teamMembers
          .split(',')
          .map((member) => member.trim());
        const lastMember = membersArray[membersArray.length - 1];
        const formattedMembers =
          membersArray.length > 1
            ? membersArray.slice(0, -1).join(', ') + ' & ' + lastMember
            : lastMember;
        return {
          ...item,
          teamMembersArray: membersArray,
          formattedMembers,
          showMore: false,
        };
      });
    },
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
    editMember(index) {
      console.log('Edit member:', index);
    },
    deleteMember(index) {
      console.log('Delete member:', index);
    },
  },
};
</script>

<style scoped lang="scss">
@import './accordion-container';
</style>
