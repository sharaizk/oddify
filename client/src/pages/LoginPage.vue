<template>
  <div class="login_page">
    <form @submit.prevent="submitLogin" class="login_form">
      <h1 class="heading1">Oddify</h1>
      <input-field
        :label="'Email'"
        :message="'You will receive an OTP'"
        :left-icon="icon"
        type="email"
        placeholder="Your email address"
        v-model="params.email"
        :error="error"
        v-if="params.step === 1"
      />
      <otp-fields
        v-if="params.step === 2"
        :error="error"
        v-model="params.otp"
        :message="'Please enter your otp'"
      />
      <button class="full-width large primary">Log In</button>
    </form>
  </div>
</template>

<script>
import InputField from "@/components/custom/InputField.vue";
import MailIcon from "@/components/icons/MailIcon.vue";
import OtpFields from "@/components/custom/OtpFIelds.vue";
import userInstance from "@/axios/userInstance";
import { saveToken } from "../vuex/localstorage";
export default {
  name: "LoginPage",
  data() {
    return {
      params: {
        email: "",
        otp: null,
        step: 1,
      },
      error: "",
      icon: MailIcon,
    };
  },
  components: {
    InputField,
    OtpFields,
  },

  methods: {
    saveToken: saveToken,
    async submitLogin() {
      try {
        const loginResponse = await userInstance.post("/login", {
          ...this.params,
        });

        if (loginResponse.data.step === 2) {
          this.params.step = loginResponse.data.step;
          this.$store.commit("setSnack", {
            title: loginResponse.data.otpTitle,
            description: loginResponse.data.otpDescription,
            timeout: 5000,
            position: "top-right",
          });
        } else if (
          loginResponse.data.message === "User logged in Successfully"
        ) {
          this.saveToken(loginResponse.data.token, "token");
          this.$store.commit("setUser", loginResponse.data.user);
          this.$store.commit("setLoggedIn", true);
          this.params = {
            email: "",
            otp: null,
            step: 1,
          };
          this.$router.push({ name: "home" });
        }
      } catch (error) {
        this.error = error.response?.data.error;
      }
    },
  },
};
</script>
