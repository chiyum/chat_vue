<script setup lang="ts">
import GradientBorderBox from "@/components/gradient-border-box.vue";

interface State {
  enterText: string;
  isShowTool: boolean;
}

const state: State = reactive({
  enterText: "",
  isShowTool: false
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
        :offset="[0, 35]"
        @show="
          () => {
            state.isShowTool = true;
          }
        "
        @hide="
          () => {
            state.isShowTool = false;
          }
        "
      >
        <gradient-border-box
          border-radius="20px"
          wrapBorderRadius="20px"
          background="linear-gradient(90deg, rgba(252,131,58,1) 0%, rgba(232,88,22,1) 100%)"
          border-color="linear-gradient(180deg, rgba(252,131,58,1) 0%, rgba(232,88,22,1) 100%)"
          height="2rem"
          width="8rem"
        ></gradient-border-box>
      </q-menu>
    </q-icon>
    <div class="layout-default-footer-control-input-wrap">
      <q-input
        class="layout-default-footer-control-input"
        dense
        borderless
        rounded
        input-class="layout-default-footer-control-input-content"
        :placeholder="'請輸入訊息...'"
        v-model="state.enterText"
      />
      <q-icon class="layout-default-footer-control-input-sent">
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
  color: #828080;
  &::placeholder {
    color: #c9caca;
  }
}
</style>
