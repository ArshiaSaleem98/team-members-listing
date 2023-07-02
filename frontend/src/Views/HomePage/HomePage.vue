<template>
  <div class="home-page__header">
    <h1>{{ pageTitle }}</h1>
  </div>
  <div class="home-page__content">
    <AccordionContainer />
  </div>
</template>

<script>
import AccordionContainer from '../../components/AccordionContainer/AccordionContainer.vue';

export default {
  name: 'HomePage',
  components: {
    AccordionContainer,
  },
  data() {
    return {
      pageTitle: 'Team Member Listing Page',
    };
  },
};
</script>

<style scoped lang="scss">
@import './home-page';
</style>
