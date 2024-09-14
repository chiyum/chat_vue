<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { isNil, defaultTo, path } from "ramda";
import { QTabPanels, QTabPanel } from "quasar";

const route = useRoute();
const router = useRouter();

const layout = computed(() => {
  if (isNil(route?.path)) return null;
  const currentLayout = defaultTo("layout-error")(
    path(["meta", "layout"], route)
  );
  return currentLayout;
});

// 獲取路由配置中的路由
const routes = computed(() => {
  return router.options.routes;
});

// 當前激活的標籤
const activeTab = ref(0);

// 監聽路由變化，更新 activeTab
watch(
  () => route.path,
  (newPath) => {
    const index = routes.value.findIndex((r) => r.path === newPath);
    if (index !== -1) {
      activeTab.value = index;
    }
  },
  { immediate: true }
);

// 切換標籤時進行路由跳轉
const onTabChange = (newTab: number) => {
  const newRoute = routes.value[newTab];
  if (newRoute) {
    router.push(newRoute.path);
  }
};
</script>

<template>
  <component :is="layout">
    <q-tab-panels
      v-model="activeTab"
      animated
      @update:model-value="onTabChange"
    >
      <q-tab-panel
        v-for="(route, index) in routes"
        :name="index"
        :key="route.path"
      >
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="index == activeTab" />
          </keep-alive>
        </router-view>
      </q-tab-panel>
    </q-tab-panels>
  </component>
</template>

<style scoped lang="scss">
:deep(.q-tab-panels) {
  height: 100%;
}
</style>
