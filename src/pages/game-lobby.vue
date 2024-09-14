<script setup lang="ts">
import chatList from "@/components/chat-list.vue";
import { useChatStore } from "@/store/chat";
import { storeToRefs } from "pinia";
import { getImageUrl } from "@/utils/getImageUrl";

defineOptions({
  layout: "layout-default"
});

const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);

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
</script>

<template>
  <div style="height: 100%">
    <chat-list :chat-list="messages" />
  </div>
</template>
