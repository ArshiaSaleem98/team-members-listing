<template>
  <div class="accordion">
    <transition-group name="accordion-item" tag="div">
      <div
        v-for="(item, index) in displayedItems"
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
            @click="toggleItem(item)"
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
    <PaginationComponent
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-change="changePage"
    ></PaginationComponent>
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
import PaginationComponent from '@/components/PaginationComponent/PaginationComponent.vue';

export default {
  components: {
    TeamMembersTable,
    TeamDetailsContainer,
    PaginationComponent,
  },
  data() {
    return {
      teams: [],
      accordionItems: [],
      currentPage: 1,
      pageSize: 1,
    };
  },
  computed: {
    displayedMembers() {
      return function (item) {
        if (item.teamMembers) {
          console.log('itemMember', item.teamMembers);
          return item.teamMembers;
        }
        return [];
      };
    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.accordionItems.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.accordionItems.length / this.pageSize);
    },
  },
  mounted() {
    this.fetchTeamsAndMembers();
  },
  methods: {
    deleteTeamMethod(id, index) {
      return deleteTeam(id, index, this);
    },
    fetchTeamsAndMembers() {
      return fetchTeamsAndMembers(this);
    },

    toggleItem(index) {
      console.log('toggleItem', index);
      this.accordionItems.forEach((item) => {
        if (item.id === index.id) {
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
      editTeam(id, this.accordionItems[index], this);
      this.$emit('update-teams-array', this.accordionItems);
    },

    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped lang="scss">
@import './accordion-container';
</style>
