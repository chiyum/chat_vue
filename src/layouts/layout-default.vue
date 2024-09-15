<script setup lang="ts">
import footerControl from "@/components/layouts/layout-default-footer-control.vue";
import getImageUrl from "@/utils/getImageUrl";
import { useI18n } from "@/i18n";
import { useChatStore } from "@/store/chat";

type Tab = {
  name: string;
  path: string;
  index?: number;
};

interface State {
  avatar: string;
  vipLevel: number;
  username: string;
  tabs: Tab[];
  currentTab: Tab | null;
  activePosition: string;
  onBackFunction: null | (() => void);
}

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { messages } = storeToRefs(useChatStore());
const msgContainer = ref(null);

const scrollStyle = computed(() => {
  const isNoScroll = route.meta.handleScroll;
  return isNoScroll ? "overflow-y: hidden" : "overflow-y: scroll";
});

const state: State = reactive({
  avatar: getImageUrl("avartar.png"),
  vipLevel: 1,
  username: "Ager",
  tabs: [
    { name: "global.header.tab.news", path: "/news", index: 0 },
    { name: "global.header.tab.friends", path: "/friends", index: 1 },
    { name: "global.header.tab.gameLobby", path: "/game-lobby", index: 2 }
  ],
  currentTab: null,
  activePosition: computed(() => {
    return state.currentTab?.index
      ? `${Math.floor(state.currentTab.index * (100 / state.tabs.length)) - 2}%`
      : "-2%";
  }),
  onBackFunction: null
});

const onToggleTab = (tab: Tab, index: number) => {
  state.currentTab = { ...tab, index };
  router.push(tab.path);
};

const setDefaultTab = () => {
  const currentTab = state.tabs.find(
    (tab) => tab.path === router.currentRoute.value.path
  );
  const currentTabIndex = state.tabs.findIndex(
    (tab) => tab.path === router.currentRoute.value.path
  );
  if (currentTab) {
    state.currentTab = {
      ...currentTab,
      index: currentTabIndex
    };
  }
};

const onBack = () => {
  if (state.onBackFunction) state.onBackFunction();
  else router.back();
};

const init = () => {
  setDefaultTab();
};

const changeBackFunction = (onBackFunction: null | (() => void)) => {
  state.onBackFunction = onBackFunction;
};

provide("changeBackFunction", changeBackFunction);

init();

watch(
  () => route.path,
  (newPath) => {
    const currentTab = state.tabs.find((tab) => tab.path === newPath);
    onToggleTab(currentTab, currentTab?.index ?? 0);
  },
  { immediate: true }
);

watch(
  () => messages,
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
  <div class="layout-default" :style="`${scrollStyle}`" ref="msgContainer">
    <div class="layout-default-header">
      <div class="layout-default-header-content">
        <div class="layout-default-header-content-arrow">
          <q-icon
            size="1.5rem"
            name="arrow_back_ios"
            color="white"
            @click="onBack"
          />
        </div>
        <div class="layout-default-header-content-nav">
          <div
            class="layout-default-header-content-nav-active"
            :style="{
              left: state.activePosition
            }"
          >
            <span>
              {{ t(state.currentTab?.name ?? "") }}
            </span>
          </div>
          <div
            class="layout-default-header-content-nav-item"
            v-for="(tab, index) in state.tabs"
            :key="tab.path"
            @click="onToggleTab(tab, index)"
          >
            {{ t(tab.name) }}
          </div>
        </div>
        <div class="layout-default-header-content-profile">
          <div class="layout-default-header-content-profile-item">
            <p class="layout-default-header-content-profile-vip">
              {{ t("global.vip.level", { level: state.vipLevel }) }}
            </p>
            <p class="layout-default-header-content-profile-username">
              {{ state.username }}
            </p>
          </div>
          <q-avatar class="layout-default-header-content-profile-item">
            <q-img :src="state.avatar" />
          </q-avatar>
        </div>
      </div>
    </div>
    <div class="layout-default-main">
      <slot />
    </div>
    <div class="layout-default-footer">
      <footer-control v-if="!route.meta.hideInput" />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/layouts.scss";
</style>
