<template>
  <div class="mutation-modal">
    <header class="mutation-modal__header">
      <h3>Редактирование коллекции:</h3>
      <div class="mutation-modal__ui-panel">
        <input
          class="mutation-modal__search"
          type="search"
          placeholder="Поиск мутации"
          v-model="mutationsStore.searchQuery"
        />
        <button @click="patchMutations">Добавить выбранные мутации</button>
      </div>
    </header>

    <div class="mutation-modal__mutation-list">
      <MutationItem
        class="mutation"
        v-for="mutation in mutationsStore.filteredMutations"
        :key="mutation.mutationId"
        :mutation="mutation"
      >
        <input
          class="mutation__checkbox"
          type="checkbox"
          :value="mutation.mutationId"
          v-model="selectedMutations"
        />
      </MutationItem>
      <Observer :action="mutationsStore.fetchMutations" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MutationItem from "@/shared/components/MutationItem.vue";
import Observer from "@/shared/components/Observer.vue";
import { ref } from "vue";
import { useMutationsStore } from "@/shared/stores/MutationsStore";
import { useListsStore } from "@/shared/stores/listsStore";

const mutationsStore = useMutationsStore();
const listsStore = useListsStore();

const selectedMutations = ref<string[]>(listsStore.currentList.mutations);

const emit = defineEmits(["close"]);
const patchMutations = () => {
  listsStore.patchList(selectedMutations.value);
  emit("close");
};
</script>

<style lang="scss" scoped>
.mutation {
  &__checkbox {
    position: absolute;
    top: 0px;
    right: 0px;
    height: 20px;
    width: 20px;
  }
}

.mutation-modal {
  width: 900px;

  &__mutation-list {
    max-height: 75vh;
    overflow: hidden auto;
  }
  &__ui-panel {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  &__search {
    width: 400px;
  }
}
</style>
