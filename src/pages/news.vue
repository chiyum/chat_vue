<script setup lang="ts">
import chatList from "@/components/chat-list.vue";
import { useChatStore } from "@/store/chat";
import { storeToRefs } from "pinia";
import { getImageUrl } from "@/utils/getImageUrl";

defineOptions({
  layout: "layout-default",
  sort: 1,
  hideInput: true
});

const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);

const fackmessages = [
  {
    name: "WU88客服",
    avatar: getImageUrl("customer_service_logo.jpeg"),
    text:
      "***金流出款次數公告*** - 因近日銀行往來次數嚴格，對於代付出款次數將進行調整\n" +
      "\n" +
      "時段 : 不限\n" +
      "\n" +
      "因近期銀行風控較嚴，為避免會員損失及風險\n" +
      "\n" +
      "出款將嚴格限制一筆，且包含其他娛樂城當日出金紀錄\n" +
      "\n" +
      "若點數退回您的錢包，請於隔日再提交出款\n" +
      "\n" +
      "造成不便，敬請見諒！",
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
