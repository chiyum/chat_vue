<script setup lang="ts">
import { ChatItem } from "@/types/chat";
import { useI18n } from "@/i18n";

interface Props {
  height: string;
  chatList: Array<ChatItem>;
}

const props = withDefaults(defineProps<Props>(), {
  height: "100%",
  chatList: () => []
});

const { t } = useI18n();

const msgContainer = ref(null);

// 主要用來讓滾動軸保持在最底部
watch(
  () => props.chatList,
  () => {
    if (msgContainer.value) {
      nextTick(() => {
        msgContainer.value.scrollTop = msgContainer.value.scrollHeight;
      });
    }
  },
  {
    deep: true
  }
);
</script>

<template>
  <div
    class="chat-box-messages"
    style="width: 100%"
    :style="{ height: height }"
    ref="msgContainer"
  >
    <q-chat-message
      v-for="(chat, index) in chatList"
      :key="`chat-${index}`"
      :name="chat.name"
      :avatar="chat.avatar"
      :text="[chat.text]"
      :sent="chat.isSent"
    >
      <template #name>
        <div
          class="chat-box-messages-profile"
          :class="{ 'chat-box-messages-profile--sent': chat.isSent }"
        >
          <div class="chat-box-messages-profile-item">
            <p class="chat-box-messages-profile-vip">
              {{ t("global.vip.level", { level: chat.otherData.vipLevel }) }}
            </p>
            <p class="chat-box-messages-profile-username">
              {{ chat.name }}
            </p>
          </div>
        </div>
      </template>
      <template #avatar>
        <div>
          <q-img class="chat-box-messages-avatar" :src="chat.avatar" />
          <div class="chat-box-messages-stamp">
            <div>{{ chat.otherData.isRead ? "已讀" : "" }}</div>
            <div>{{ chat.stamp }}</div>
          </div>
        </div>
      </template>
    </q-chat-message>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/chat-list.scss";
</style>
