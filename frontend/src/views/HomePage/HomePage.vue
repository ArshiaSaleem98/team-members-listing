<template>
  <div class="home-page">
    <div class="home-page__header">
      <h1>{{ pageTitle }}</h1>
    </div>
    <div class="open-modal-button-container">
      <button class="open-modal-button" @click="toggleModal">Open Modal</button>
    </div>
    <div class="home-page__content">
      <AccordionContainer ref="accordionContainer" />
    </div>
    <ModalComponent
      label="Team Name"
      title="Team"
      @teamAdded="handleTeamAdded"
      :show-modal="showModal"
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
      pageTitle: 'Team Member Listing Page',
      showModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    handleTeamAdded(teamData) {
      console.log('holaHome', teamData);
      this.$refs.accordionContainer.fetchTeamsAndMembers();
    },
  },
};
</script>

<style scoped lang="scss">
@import './home-page.scss';
</style>
