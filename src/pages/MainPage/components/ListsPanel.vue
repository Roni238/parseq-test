<template>
  <aside class="lists-panel">
    <div class="lists-panel__header">
      <input
        class="search-input"
        type="search"
        placeholder="Поиск"
        v-model="listsStore.searchQuery"
      />
    </div>

    <ul class="lists-panel__list">
      <li
        v-for="mutationlist in listsStore.filteredLists"
        @click="listsStore.setCurrentList(mutationlist)"
        :key="mutationlist.name"
        class="lists-panel__item"
        :class="{
          'lists-panel__item--active':
            listsStore.currentList.name === mutationlist.name,
        }"
      >
        {{ mutationlist.name }}
      </li>
    </ul>

    <div class="lists-panel__footer">
      <form class="create-form" @submit.prevent="createlist">
        <input
          class="create-form__input"
          type="text"
          placeholder="Введите название"
          v-model="newlist"
        />
        <button class="create-form__submit" type="submit">+</button>
      </form>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useListsStore } from "@/shared/stores/listsStore";
const listsStore = useListsStore();

import { ref, onMounted } from "vue";

onMounted(async () => {
  await listsStore.fetchList();
});

const newlist = ref("");

const createlist = async () => {
  await listsStore.createList(newlist.value);
  newlist.value = "";
};
</script>

<style lang="scss" scoped>
.lists-panel {
  display: grid;
  grid-auto-rows: min-content auto min-content;
  gap: 20px;
  height: 100dvh;
  padding: 20px 12px;
  background: #2a2a2a;
  position: sticky;
  inset: 0 0 0 auto;

  &__list {
    margin: 0;
    list-style: none;
    overflow-x: auto;
  }

  &__item {
    padding: 8px 12px;
    margin-bottom: 8px;
    border-radius: 4px;
    background: #404040;
    color: $white-color;
    max-width: 100%;
    $white-color-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      background: #4a4a4a;
    }

    &--active {
      background: #555;
      font-weight: bold;
    }
  }
}

.search-input {
  width: 100%;
  color: $white-color;

  &::placeholder {
    color: #999;
  }
}

.create-form {
  display: flex;
  overflow: hidden;
  background: #404040;
  &__input {
    flex-grow: 1;
    color: $white-color;

    &::placeholder {
      color: #999;
    }
  }

  &__submit {
    padding: 0 16px;
    background: $green-color;
    color: $white-color;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
}
</style>
