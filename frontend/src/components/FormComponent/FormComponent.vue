<template>
  <div>
    <label v-if="label === 'Member Name'">Team Name</label>
    <div class="form-group">
      <div class="select-wrapper">
        <select
          v-if="label === 'Member Name'"
          v-model="selectedTeam"
          class="form-control"
          :placeholder="label"
          aria-label="Select Team"
        >
          <option value="" disabled>Select Team</option>
          <option v-for="team in teamsArray" :key="team.id" :value="team.id">
            {{ team.teamName }}
          </option>
        </select>
        <div
          v-if="label === 'Member Name'"
          class="select-arrow"
          aria-hidden="true"
        >
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
    </div>
    <label>{{ label }}</label>
    <div class="form-group">
      <input
        v-model="formData"
        type="text"
        :class="{
          'form-control': true,
          'is-invalid': !formData,
          'is-valid': formData,
        }"
        :placeholder="label"
        aria-label="Input Field"
      />
      <div v-if="!formData" class="invalid-feedback">
        Please fill the input field.
      </div>
    </div>
    <div class="form-buttons">
      <button class="btn btn-primary" @click="save">Save</button>
      <button class="btn btn-secondary" @click="cancel">Cancel</button>
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
  emits: ['cancel'],
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
      if (this.label === 'Team Name' && this.formData !== '') {
        addTeam(this, data);
      } else if (
        this.label === 'Member Name' &&
        this.formData !== '' &&
        this.selectedTeam !== ''
      ) {
        const addNewMember = {
          name: this.formData,
          teamId: this.selectedTeam,
        };
        addMember(this, addNewMember);
      }
    },
    cancel() {
      this.clearForm();
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped lang="scss">
@import './form-component';
</style>
