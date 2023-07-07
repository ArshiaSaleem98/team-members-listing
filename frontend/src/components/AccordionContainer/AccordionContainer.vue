<template>
  <div>
    <div class="section-header">Teams Section</div>

    <div class="accordion">
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
              :placeholder="item.title"
              aria-label="Edit team name"
            />
            <div v-else class="team-name">{{ item.title }}</div>
          </div>
          <div class="accordion-item__buttons">
            <span
              v-if="!item.editing"
              class="edit-button"
              tabindex="0"
              role="button"
              aria-label="Edit"
              @click="startEditing(index)"
            >
              <div class="icon-wrapper">
                <i class="fas fa-edit"></i>
              </div>
            </span>
            <span
              v-else
              class="save-button"
              tabindex="0"
              role="button"
              aria-label="Save"
              @click="
                saveTeam(
                  item.id,
                  item.editedTitle ? item.editedTitle : item.title,
                  index,
                )
              "
            >
              <div class="icon-wrapper">
                <i class="fas fa-save"></i>
              </div>
            </span>
            <span
              class="delete-button"
              tabindex="0"
              role="button"
              aria-label="Delete"
              @click="showDeleteConfirmation(item.id, index, item.title)"
            >
              <div class="icon-wrapper">
                <i class="fas fa-trash"></i>
              </div>
            </span>
            <span
              class="accordion-icon"
              tabindex="0"
              role="button"
              :aria-label="item.open ? 'Collapse' : 'Expand'"
              @click="toggleItem(item)"
            >
              <div class="icon-wrapper">
                <i
                  class="fas"
                  :class="{
                    'fa-chevron-up': item.open,
                    'fa-chevron-down': !item.open,
                  }"
                ></i>
              </div>
            </span>
          </div>
        </div>
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
                @delete-member="deleteMemberMethod"
              ></team-members-table>
            </div>
          </div>
        </div>
      </div>
      <DeleteModalComponent
        v-if="showDeleteModal"
        :message="deleteModalMessage"
        :item-id="teamToDeleteId"
        :index="teamToDeleteIndex"
        @delete-team="deleteTeamMethod"
        @cancel-delete="cancelDelete"
      ></DeleteModalComponent>
      <PaginationComponent
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="changePage"
      ></PaginationComponent>
    </div>
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
import DeleteModalComponent from '@/components/DeleteModalComponent/DeleteModalComponent.vue';

export default {
  components: {
    TeamMembersTable,
    TeamDetailsContainer,
    PaginationComponent,
    DeleteModalComponent,
  },
  emits: ['update-teams-array'],
  data() {
    return {
      teams: [],
      accordionItems: [],
      currentPage: 1,
      pageSize: 10,
      showDeleteModal: false,
      teamToDeleteId: '',
      teamToDeleteIndex: '',
      teamToDeleteName: null,
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
    deleteModalMessage() {
      if (this.teamToDeleteName) {
        const teamName = this.teamToDeleteName;
        const message = `Are you sure you want to delete team <strong>${teamName}</strong> and all it's members?`;
        return message;
      }
      return '';
    },
  },
  mounted() {
    this.fetchTeamsAndMembers();
  },
  methods: {
    deleteMemberMethod(memberId) {
      this.accordionItems.forEach((item) => {
        const index = item.teamMembers.findIndex(
          (member) => member.id === memberId,
        );
        if (index !== -1) {
          item.teamMembers.splice(index, 1);
        }
      });
      this.cancelDelete();
    },
    deleteTeamMethod(id, teamOptions) {
      const { index } = teamOptions;
      this.showDeleteModal = false;
      return deleteTeam(id, index, this);
    },
    cancelDelete() {
      this.showDeleteModal = false;
    },
    fetchTeamsAndMembers() {
      return fetchTeamsAndMembers(this);
    },

    toggleItem(index) {
      this.accordionItems.forEach((item) => {
        if (item.id === index.id) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
      });
    },

    showDeleteConfirmation(teamId, index, name) {
      (this.teamToDeleteId = teamId), (this.teamToDeleteIndex = index);
      this.teamToDeleteName = name;
      console.log('hoal', name);
      this.showDeleteModal = true;
    },

    startEditing(index) {
      this.accordionItems[index].editing = true;
    },
    saveTeam(id, editedTitle, index) {
      const updatedTitle = editedTitle;
      if (updatedTitle !== '') {
        this.accordionItems[index].title = editedTitle;
        this.accordionItems[index].name = editedTitle;
        this.accordionItems[index].editing = false;
        editTeam(id, this.accordionItems[index], this);
        this.$emit('update-teams-array', this.accordionItems);
      }
    },

    changePage(page) {
      const openStates = {};
      this.accordionItems.forEach((item) => {
        openStates[item.id] = item.open;
      });

      this.currentPage = page;

      this.accordionItems.forEach((item) => {
        item.open = openStates[item.id];
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import './accordion-container';
</style>
