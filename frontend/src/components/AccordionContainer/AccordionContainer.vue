<template>
  <div class="accordion">
    <transition-group name="accordion-item" tag="div">
      <div
        v-for="(item, index) in accordionItems"
        :key="item.id"
        class="accordion-item"
        :class="{ 'accordion-item--active': item.open }"
      >
        <div class="accordion-item__header">
          <div class="accordion-item__title">
            <input
              v-if="item.editing"
              v-model="item.editedTitle"
              class="team-name-edit"
            />
            <div v-else class="team-name">{{ item.title }}</div>
          </div>
          <div class="accordion-item__buttons">
            <button
              v-if="!item.editing"
              class="edit-button"
              @click="startEditing(index)"
            >
              Edit
            </button>
            <button
              v-else
              class="save-button"
              @click="saveTeam(item.id, item.editedTitle, index)"
            >
              Save
            </button>
            <button
              class="delete-button"
              @click="deleteTeamMethod(item.id, index)"
            >
              Delete
            </button>
          </div>
          <span
            class="accordion-icon"
            :class="{ open: item.open }"
            @click="toggleItem(index)"
          >
            &#x25BE;
          </span>
        </div>
        <transition name="accordion-content">
          <div v-if="item.open" class="accordion-item__content">
            <div
              class="accordion-item__left-container"
              :class="{ 'accordion-item__left-container--mobile': isMobile }"
            >
              <TeamDetailsContainer
                :title="item.title"
                :item="item"
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
                  :fetch-teams-and-members="fetchTeamsAndMembers"
                ></team-members-table>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {
  fetchTeamsAndMembers,
  deleteTeam,
  editTeam,
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
        if (item.teamMembers) {
          console.log('itemMember', item.teamMembers);
          return item.teamMembers;
        }
        return [];
      };
    },
  },
  mounted() {
    this.fetchTeamsAndMembers();
  },
  methods: {
    deleteTeamMethod(id, index) {
      const position = this.accordionItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.accordionItems.splice(position, 1);
      }
      deleteTeam(id);
    },

    toggleItem(index) {
      // This method will be triggered only when clicking on the accordion icon
      this.accordionItems.forEach((item, i) => {
        if (i === index) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
      });
    },

    startEditing(index) {
      this.accordionItems[index].editing = true;
    },

    saveTeam(id, editedTitle, index) {
      this.accordionItems[index].title = editedTitle;
      this.accordionItems[index].name = editedTitle;
      this.accordionItems[index].editing = false;
      editTeam(id, this.accordionItems[index], this.fetchTeamsAndMembers);
    },

    async fetchTeamsAndMembers() {
      try {
        const accordionItems = await fetchTeamsAndMembers();
        this.accordionItems = accordionItems;
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
