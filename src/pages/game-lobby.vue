<script setup lang="ts">
import chatList from "@/components/chat-list.vue";
const messages = [
  {
    name: "avatar",
    avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
    text: "hey, how are you?",
    isSent: true,
    stamp: "7 minutes ag",
    otherData: {
      vipLevel: 3,
      isRead: true
    }
  },
  {
    name: "Jane",
    avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
    text: "hey, how are you?",
    isSent: false,
    stamp: "4 minutes ag",
    otherData: {
      vipLevel: 1,
      isRead: true
    }
  }
];
defineOptions({
  layout: "layout-default"
});
</script>

<template>
  <div style="height: 100%">
    <chat-list :chat-list="messages" />
  </div>
</template>

<style lang="scss" scoped>
//.home-card {
//  margin: 20px;
//  width: 400px;
//  background: #eeeeee;
//}
//
//.box {
//  border-radius: 28px;
//  border: #ffffff 5px solid;
//  box-shadow: #e2a307 0.5px 0.5px 0.5px;
//}
</style>
