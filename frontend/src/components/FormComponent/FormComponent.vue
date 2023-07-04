<template>
  <div>
    <label>{{ label }}</label>
    <input type="text" v-model="formData" />
    <div class="form-buttons">
      <button @click="save">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
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
      console.log('label', this.label);
      this.$emit('save', this.formData);
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
