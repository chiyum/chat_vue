<script setup lang="ts"></script>

<template>
  <div class="layout-default">
    <div class="layout-default-header">
      <div class="layout-default-header-content">
        <div class="layout-default-header-content-arrow"></div>
        <div class="layout-default-header-content-nav">
          <q-btn to="/home" label="home" />
          <q-btn to="/notify" label="notify" />
        </div>
        <div class="layout-default-header-content-profile"></div>
      </div>
    </div>
    <div class="layout-default-main">
      <slot />
    </div>
    <div class="layout-default-footer"></div>
  </div>
</template>

<style lang="scss">
.layout-default {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: #faf4d3;
  &-header {
    position: sticky;
    top: 0;
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(252, 131, 58, 1) 0%,
      rgba(232, 88, 22, 1) 100%
    );
    border-radius: 0 0 10px 10px;
    z-index: 1;
    &-content {
      margin-bottom: 1.2rem;
      height: 4rem;
      background: linear-gradient(
        0deg,
        rgba(252, 131, 58, 1) 0%,
        rgba(232, 88, 22, 1) 100%
      );
    }
  }
  $footer-height: 4.5rem;
  &-main {
    width: 100%;
    flex-shrink: 0;
    background: #faf4d3;
    margin-bottom: $footer-height;
  }
  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $footer-height;
    background: linear-gradient(
      0deg,
      rgba(252, 131, 58, 1) 0%,
      rgba(232, 88, 22, 1) 100%
    );
    border-radius: 10px 10px 0 0;
  }
  .q-tab-panels {
    background: #faf4d3 !important;
  }
}
</style>
