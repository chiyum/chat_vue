<script setup lang="ts">
import chatList from "@/components/chat-list.vue";
import { useChatStore } from "@/store/chat";
import { storeToRefs } from "pinia";
import { getImageUrl } from "@/utils/getImageUrl";

const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);
console.log(getImageUrl("avartar.png"), "images");
const fackmessages = [
  {
    name: "avatar",
    avatar: getImageUrl("avartar.png"),
    text: "hey, how are you?",
    isSent: true,
    stamp: "12:00",
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
    stamp: "12:30",
    otherData: {
      vipLevel: 1,
      isRead: true
    }
  }
];

const init = () => {
  chatStore.initDefaultMessages(fackmessages);
};
init();
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
