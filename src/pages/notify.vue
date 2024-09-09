<script setup lang="ts">
import GradientBorderBox from "@/components/gradient-border-box.vue";
const { t } = useI18n();

defineOptions({
  slidePosition: "left"
});
</script>

<template>
  <div>
    <q-card class="home-card">
      <img style="min-height: 200px" src="@/assets/vue.svg" />

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>
        <div class="box">
          <GradientBorderBox
            height="65px"
            border-radius="16px"
            wrap-border-radius="28px"
            border-width="4px"
            background="linear-gradient(0deg, rgba(252,166,17,1) 0%, rgba(255,246,184,1) 100%)"
            border-color="linear-gradient(180deg, rgba(252,166,17,1) 0%, rgba(255,246,184,1) 100%)"
          ></GradientBorderBox>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ t("global.hello") }} notify
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss"></style>
