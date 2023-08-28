<template>
  <div class="d-flex-column">
    <transition name="slider-right" mode="out-in">
      <FilterForm1
        v-if="step === 1"
        :step="step"
        :submit-form="handleSubmit"
        :selected-params="params"
      />
      <FilterForm2
        v-else-if="step === 2"
        :step="step"
        :submit-form="handleSubmit"
        :back-step="backStep"
        :selected-params="params"
      />
    </transition>
  </div>
</template>
<script>
import FilterForm1 from "@/components/forms/FilterForm1.vue";
import FilterForm2 from "@/components/forms/FilterForm2.vue";
import filterInstance from "@/axios/filterInstance";
export default {
  data() {
    return {
      step: 1,
      params: {},
    };
  },
  components: {
    FilterForm1,
    FilterForm2,
  },

  computed: {},

  methods: {
    handleSubmit(step, params) {
      this.params = {
        ...this.params,
        ...params,
      };
      if (this.step === 1) {
        this.step = step;
      } else if (this.step === 2) {
        this.submitForm();
      }
    },
    backStep(params) {
      this.step = this.step - 1;
      if (params) {
        this.params = {
          ...this.params,
          ...params,
        };
      }
    },
    async submitForm() {
      try {
        const newFilterResponse = await filterInstance.post("/new-filter", {
          ...this.params,
        });
        if (newFilterResponse.status === 200) {
          this.$router.push("/settings/notify");
        }
      } catch (e) {
        this.$store.commit("setSnack", {
          title: "Error",
          type: "error",
          description: e.response.data.error,
        });
      }
    },
  },
};
</script>
