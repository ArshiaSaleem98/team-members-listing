<template>
  <div>
    <label>{{ label }}</label>
    <input v-model="formData" type="text" />
    <div class="form-buttons">
      <button @click="save">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import AddTeamService from '@/services/TeamServices/AddTeamService.js';

export default {
  name: 'FormComponent',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: '',
    };
  },
  methods: {
    save() {
      AddTeamService.addTeam({ name: this.formData })
        .then((response) => {
          console.log('Team added successfully:', response);
          this.$emit('teamAdded', response.data);
        })
        .catch((error) => {
          console.error('Error adding the team:', error);
        });
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped lang="scss">
@import './form-component';
</style>
