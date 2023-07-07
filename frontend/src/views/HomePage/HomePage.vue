<template>
  <div class="home-page">
    <div class="home-page__header">
      <h1 page-title>{{ pageTitle }}</h1>
    </div>
    <div class="add-team-member-modal-button-container">
      <button
        class="add-team-button"
        aria-label="Add Team"
        @click="toggleModal('team')"
      >
        Add Team
      </button>
      <button
        class="add-member-button"
        aria-label="Add Member"
        @click="toggleModal('member')"
      >
        Add Member
      </button>
    </div>
    <div class="home-page__content">
      <AccordionContainer
        ref="accordionContainer"
        @update-teams-array="handleTeamsArray"
      />
    </div>
    <ModalComponent
      :label="modalLabel"
      :title="modalTitle"
      :show-modal="showModal"
      :teams-array="teamsArray"
      @team-added="handleTeamAdded"
      @member-added="handleMemberAdded"
      @close-modal="toggleModal"
    />
  </div>
</template>

<script>
import ModalComponent from '@/components/ModalComponent/ModalComponent.vue';
import AccordionContainer from '@/components/AccordionContainer/AccordionContainer.vue';

export default {
  name: 'HomePage',
  components: {
    ModalComponent,
    AccordionContainer,
  },
  data() {
    return {
      pageTitle: 'Team member listing page',
      showModal: false,
      modalType: '',
      teamsArray: [],
    };
  },
  computed: {
    modalLabel() {
      return this.modalType === 'team' ? 'Team Name' : 'Member Name';
    },
    modalTitle() {
      return this.modalType === 'team' ? 'Team' : 'Member';
    },
  },
  methods: {
    toggleModal(type) {
      this.modalType = type;
      this.showModal = !this.showModal;
    },
    handleTeamAdded(teamData) {
      console.log('Team added:', teamData);
      this.$refs.accordionContainer.fetchTeamsAndMembers();
    },
    handleMemberAdded(memberData) {
      console.log('Member added:', memberData);
      this.$refs.accordionContainer.fetchTeamsAndMembers();
    },
    handleTeamsArray(array) {
      this.teamsArray = array;
    },
  },
};
</script>

<style scoped lang="scss">
@import './home-page.scss';
</style>
