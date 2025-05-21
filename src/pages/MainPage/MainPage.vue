<template>
  <main class="main">
    <div class="main__container">
      <MutationList v-if="!listStore.currentList.name" />
      <Currentlist v-else />

      <ListsPanel />
    </div>
  </main>
</template>

<script lang="ts" setup>
import ListsPanel from "@/pages/MainPage/components/ListsPanel.vue";
import MutationList from "@/pages/MainPage/components/MutationList.vue";
import Currentlist from "@/pages/MainPage/components/Currentlist.vue";

import { useListsStore } from "@/shared/stores/listsStore";
const listStore = useListsStore();
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  padding: 0px 20px;

  &__container {
    display: flex;
    gap: 20px;
  }
}
</style>
