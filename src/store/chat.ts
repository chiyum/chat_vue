import { defineStore } from "pinia";
import { ref } from "vue";
import { ChatItem } from "@/types/chat";

export const useChatStore = defineStore("chat", () => {
  const messages = ref<ChatItem[]>([]);

  const addMessage = (message: ChatItem) => {
    messages.value.push(message);
  };

  const initDefaultMessages = (defaultMessages: ChatItem[]) => {
    messages.value = defaultMessages;
  };

  return {
    messages,
    addMessage,
    initDefaultMessages
  };
});
