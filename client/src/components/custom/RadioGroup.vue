<template>
  <fieldset class="radio_group">
    <RadioButton
      :variant="variant"
      v-for="option in options"
      :key="option"
      :label="option"
      :checked="selectedOption === variant"
      :name="groupName"
      v-model="selectedOption"
    />
  </fieldset>
</template>

<script>
import RadioButton from "./RadioButton.vue";
export default {
  data() {
    return {
      selectedOption: null,
    };
  },
  props: {
    options: {
      default: [],
      required: true,
    },
    variant: {
      type: String,
      default: "primary",
    },
    modelValue: {
      default: null,
    },
    groupName: {
      type: String,
      default: "radio",
    },
  },
  components: {
    RadioButton,
  },

  watch: {
    selectedOption() {
      this.$emit("update:modelValue", this.selectedOption);
    },
  },
};
</script>
