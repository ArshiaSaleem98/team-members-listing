<template>
  <div>
    <label v-if="label === 'Member Name'">Team Name </label>
    <select
      v-if="label === 'Member Name'"
      v-model="selectedTeam"
      class="full-width-select"
    >
      <option v-for="team in teamsArray" :key="team.id" :value="team.id">
        {{ team.teamName }}
      </option>
    </select>
    <label>{{ label }}</label>

    <input v-model="formData" type="text" />
    <div class="form-buttons">
      <button @click="save">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import { addTeam, addMember } from '@/utils/accordionMethods.js';

export default {
  name: 'FormComponent',
  props: {
    label: {
      type: String,
      required: true,
    },
    teamsArray: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formData: '',
      selectedTeam: '',
      teams: [],
    };
  },
  methods: {
    clearForm() {
      this.formData = '';
      this.selectedTeam = '';
    },
    save() {
      const data = {
        name: this.formData,
      };
      if (this.label === 'Team Name') {
        addTeam(this, data);
      } else if (this.label === 'Member Name') {
        const addNewMember = {
          name: this.formData,
          teamId: this.selectedTeam,
        };
        addMember(this, addNewMember);
      }
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped lang="scss">
@import './form-component';
.full-width-select {
  width: 100%;
}
</style>
