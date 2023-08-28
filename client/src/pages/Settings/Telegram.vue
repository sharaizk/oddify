<template>
  <div class="settings_page page pad-1" v-if="telegramData?.telegram_status !== 1">
    <p>Telegram</p>
    <p>Email: {{ telegramData?.email }}</p>
    <p>Code: {{ telegramData?.telegram_code }}</p>
    <p>@oddify_bot</p>
  </div>
  <div class="settings_page page pad-1" v-else>
    <p>Telegram</p>
    <p>Verified</p>
    <p>@oddify_bot</p>
  </div>
</template>

<script>
import telegramInstance from "@/axios/telegramInstance";
export default {
  data() {
    return {
      telegramData: [],
    };
  },
  methods: {
      async getTelegramCode() {
      try {
        const telegramCode = await telegramInstance.post("/get-telegram-code");
        this.telegramData = telegramCode.data;
        console.log(this.telegramData);
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeMount(){
    this.getTelegramCode();
  },
};
</script>
