<script setup lang="ts">
import GradientBorderBox from "@/components/gradient-border-box.vue";
import { QInput } from "quasar";
import { useChatStore } from "@/store/chat";
import { useI18n } from "@/i18n";
import { getCurrentTime } from "@/utils/time";
import { getImageUrl } from "@/utils/getImageUrl";
import { useIMEAwareInput } from "@/utils/imeAwareInput";

const TOOL_HEIGHT: string = "2.25rem";
const chatStore = useChatStore();
const { t } = useI18n();

interface State {
  enterText: string;
  isShowTool: boolean;
}

const inputRef = ref<InstanceType<typeof QInput> | null>(null);

const state: State = reactive({
  enterText: "",
  isShowTool: false
});

const sentMessage = (): void => {
  if (state.enterText === "") return;
  // 邏輯上來說是我們傳資料過去後端，後端才回傳message，這邊是模擬
  chatStore.addMessage({
    name: "avatar",
    avatar: getImageUrl("avartar.png"),
    text: state.enterText,
    isSent: true,
    stamp: getCurrentTime().formattedTime,
    otherData: {
      vipLevel: 3,
      isRead: true
    }
  });
  state.enterText = "";
};

const { handleKeyDown, handleCompositionStart, handleCompositionEnd } =
  useIMEAwareInput({
    onEnter: sentMessage,
    onCompositionStart: () => {},
    onCompositionEnd: () => {}
  });

onMounted(() => {
  const inputEl = inputRef.value.$el.control as HTMLInputElement | undefined;
  console.dir(inputRef.value.$el.control, "input.value");
  if (inputEl) {
    inputEl.addEventListener("compositionstart", handleCompositionStart);
    inputEl.addEventListener("compositionend", handleCompositionEnd);
  }
});

onBeforeUnmount(() => {
  const inputEl = inputRef.value.$el.control as HTMLInputElement | undefined;
  if (inputEl) {
    inputEl.removeEventListener("compositionstart", handleCompositionStart);
    inputEl.removeEventListener("compositionend", handleCompositionEnd);
  }
});
</script>

<template>
  <div class="layout-default-footer-control">
    <q-icon>
      <div
        class="add-icon"
        :class="{ 'add-icon--active': state.isShowTool }"
      ></div>
      <q-menu
        style="background: none; box-shadow: none"
        anchor="top start"
        self="bottom left"
        :offset="[0, 30]"
        @update:model-value="
          (isOpen) => {
            state.isShowTool = isOpen;
          }
        "
      >
        <gradient-border-box
          :border-radius="`calc(${TOOL_HEIGHT} / 2)`"
          :wrapBorderRadius="`calc(${TOOL_HEIGHT}/ 2)`"
          background="linear-gradient(90deg, rgba(252,131,58,1) 0%, rgba(232,88,22,1) 100%)"
          border-color="linear-gradient(180deg, rgba(252,131,58,1) 0%, rgba(232,88,22,1) 100%)"
          :height="TOOL_HEIGHT"
          width="8rem"
        >
          <div class="layout-default-footer-control-tool">
            <q-icon style="width: 1.4rem; height: 1.4rem">
              <q-img src="@/assets/images/amount_icon.svg" />
            </q-icon>
            <q-icon style="width: 1.4rem; height: 1.4rem">
              <q-img src="@/assets/images/image_icon.svg" />
            </q-icon>
            <q-icon style="width: 1.4rem; height: 1.4rem">
              <q-img src="@/assets/images/expression.svg" />
            </q-icon>
          </div>
        </gradient-border-box>
      </q-menu>
    </q-icon>
    <div class="layout-default-footer-control-input-wrap">
      <q-input
        ref="inputRef"
        class="layout-default-footer-control-input"
        dense
        borderless
        rounded
        input-class="layout-default-footer-control-input-content"
        :placeholder="t('global.chat.enterMessage')"
        v-model="state.enterText"
        @keyup.enter="handleKeyDown"
      />
      <q-icon
        class="layout-default-footer-control-input-sent"
        @click="sentMessage"
      >
        <q-img
          style="width: 1.1rem; height: 1.1rem"
          src="@/assets/images/sent.svg"
        />
      </q-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/layouts.scss";
:deep(.layout-default-footer-control-input-content) {
  padding-left: 1rem;
  padding-right: 2.5rem;
  height: 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  color: #5a5a5a;
  &::placeholder {
    color: #c9caca;
  }
}
</style>
