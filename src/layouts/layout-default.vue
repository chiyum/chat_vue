<script setup lang="ts">
import footerControl from "@/components/layouts/layout-default-footer-control.vue";
import getImageUrl from "@/utils/getImageUrl";
import { useI18n } from "@/i18n";

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
}

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const state: State = reactive({
  avatar: getImageUrl("avartar.png"),
  vipLevel: 1,
  username: "Ager",
  tabs: [
    { name: "global.header.tab.news", path: "/news" },
    { name: "global.header.tab.friends", path: "/friends" },
    { name: "global.header.tab.gameLobby", path: "/game-lobby" }
  ],
  currentTab: null,
  activePosition: computed(() => {
    return state.currentTab?.index
      ? `${Math.floor(state.currentTab.index * (100 / state.tabs.length)) - 2}%`
      : "-2%";
  })
});

const onToggleTab = (tab: Tab, index) => {
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

const init = () => {
  setDefaultTab();
};
init();
</script>

<template>
  <div class="layout-default">
    <div class="layout-default-header">
      <div class="layout-default-header-content">
        <div class="layout-default-header-content-arrow">
          <q-icon size="1.5rem" name="arrow_back_ios" color="white" />
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
