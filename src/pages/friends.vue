<script setup lang="ts">
import GradientBorderBox from "@/components/gradient-border-box.vue";
import getImageUrl from "@/utils/getImageUrl";
import { useI18n } from "@/i18n";
import { useQuasar } from "quasar";
// types
import { FriendsItem } from "@/types/friends";

defineOptions({
  layout: "layout-default",
  sort: 2,
  handleScroll: true
});

const changeBackFunction = inject("changeBackFunction") as any;

const { t } = useI18n();
const $q = useQuasar();
const router = useRouter();

interface State {
  isAddPage: boolean;
  addText: string;
  filterText: string;
  friends: FriendsItem[];
  originalFriends: FriendsItem[];
}

const state: State = reactive({
  isAddPage: false,
  addText: "",
  filterText: "",
  friends: [],
  originalFriends: [
    {
      name: "古月方倩",
      avatar: getImageUrl("avartar.png"),
      vipLevel: 3,
      lastText: "hey, how are you?"
    },
    {
      name: "王小美",
      avatar: getImageUrl("avartar.png"),
      vipLevel: 1,
      lastText: "hey, how are you?"
    }
  ]
});

const onLocalFilter = () => {
  if (state.filterText === "") {
    state.friends = state.originalFriends;
  }
  state.friends = state.friends.filter((friend) => {
    return friend.name.includes(state.filterText);
  });
};

const onAddFriend = () => {
  state.originalFriends = [
    ...state.originalFriends,
    {
      name: state.addText,
      avatar: getImageUrl("avartar.png"),
      vipLevel: 1,
      lastText: "..."
    }
  ];
  // 待API
  $q.notify({
    message: t("global.friends.add.suc"),
    color: "positive",
    position: "center"
  });
  state.addText = "";
  state.isAddPage = false;
};

const init = () => {
  state.friends = state.originalFriends;
  changeBackFunction(() => {
    if (state.isAddPage) state.isAddPage = false;
    else router.back();
  });
};

watch(
  () => state.originalFriends,
  () => {
    state.friends = state.originalFriends;
  }
);

init();
</script>

<template>
  <div class="friends">
    <div class="friends-menu" v-if="!state.isAddPage">
      <div class="friends-menu-search">
        <div class="friends-menu-search-label">
          {{ t("global.friends.search.label") }}
        </div>
        <input
          :placeholder="t('global.friends.search.placeholder')"
          class="friends-menu-search-input"
          type="text"
          v-model="state.filterText"
          @keyup.enter="onLocalFilter"
        />
        <div class="friends-menu-search-icon">
          <div @click="onLocalFilter">
            <q-icon size="1.2rem" color="white" name="search"></q-icon>
          </div>
        </div>
      </div>
      <div
        class="friends-menu-item"
        v-for="(friend, index) in state.friends"
        :key="`${friend.name}-${index}`"
      >
        <gradient-border-box
          border-radius="13px"
          border-width="4.5px"
          wrapBorderRadius="13px"
          background="linear-gradient(0deg, rgba(252,166,17,1) 0%, rgba(255,246,184,1) 100%)"
          border-color="linear-gradient(180deg, rgba(252,166,17,1) 0%, rgba(255,246,184,1) 100%)"
          height="6rem"
          width="100%"
        >
          <div class="friends-menu-item-content">
            <q-img class="normal-avatar" :src="friend.avatar" />
            <div class="friends-menu-item-content-middle">
              <div class="friends-menu-item-content-middle-profile">
                <div>{{ friend.name }}</div>
                <div>VIP {{ friend.vipLevel }}</div>
              </div>
              <div class="truncate">
                {{ friend.lastText }}
              </div>
            </div>
            <div class="friends-menu-item-content-right">
              <q-img
                style="width: 2.2rem; height: 2.2rem"
                src="@/assets/images/w_point_icon.svg"
              />
              <q-img
                style="width: 2.2rem; height: 2.2rem"
                src="@/assets/images/chat_icon.svg"
              />
            </div>
          </div>
        </gradient-border-box>
      </div>
      <div class="friends-menu-add">
        <div @click="state.isAddPage = true">
          {{ t("global.friends.add") }}+
        </div>
      </div>
    </div>
    <div class="friends-add" v-else>
      <div class="friends-add-search">
        <div class="friends-add-search-label">
          {{ t("global.friends.add") }}
        </div>
        <input
          :placeholder="t('global.friends.search.placeholder')"
          class="friends-add-search-input"
          type="text"
          v-model="state.addText"
          @keyup.enter="onAddFriend"
        />
        <div class="friends-add-search-icon">
          <div @click="onAddFriend">
            <q-icon size="1.2rem" color="white" name="search"></q-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="friends-bg" v-if="state.originalFriends.length === 0">
      <q-img src="@/assets/images/empty_bg.svg" />
      <div class="friends-bg-text">
        {{ t("global.friends.empty") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/friends.scss";
</style>
