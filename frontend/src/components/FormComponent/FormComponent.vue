<template>
  <div>
    <label v-if="label === 'Member Name'">Team Name </label>
    <select
      v-if="label === 'Member Name'"
      v-model="selectedTeam"
      class="full-width-select"
    >
      <option v-for="team in teams" :key="team.id" :value="team.id">
        {{ team.name }}
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
import { addTeam, getTeams, addMember } from '@/utils/accordionMethods.js';

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
      selectedTeam: '',
      teams: [],
    };
  },
  mounted() {
    if (this.label === 'Member Name') {
      this.fetchTeams();
    }
  },
  methods: {
    save() {
      const data = {
        name: this.formData,
      };
      if (this.label === 'Team Name') {
        addTeam(data)
          .then((responseData) => {
            this.$emit('teamAdded', responseData);
          })
          .catch((error) => {
            console.log('error', error);
          });
      } else if (this.label === 'Member Name') {
        const member = {
          name: this.formData,
          teamId: this.selectedTeam,
        };
        addMember(member)
          .then((responseData) => {
            this.$emit('memberAdded', responseData);
          })
          .catch((error) => {
            console.log('error', error);
          });

        console.log('hola member', this.selectedTeam);
      }
    },
    cancel() {
      this.$emit('cancel');
    },
    async fetchTeams() {
      try {
        const allTeams = await getTeams();
        console.log('hola', allTeams);
        this.teams = allTeams;
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
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
