<template>
  <div class="mutations-list">
    <header class="mutations-list__header">
      <h1>Все мутации:</h1>
    </header>
    <main>
      <MutationItem
        v-for="mutation in mutationsStore.allMutations"
        :key="mutation.mutationId"
        :mutation="mutation"
      />
      <Observer :action="mutationsStore.fetchMutations" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import MutationItem from "@/shared/components/MutationItem.vue";
import Observer from "@/shared/components/Observer.vue";
import { useMutationsStore } from "@/shared/stores/MutationsStore";

const mutationsStore = useMutationsStore();
</script>

<style lang="scss" scoped>
.mutations-list {
  width: 100%;

  &__header {
    padding: 16px;
    background-color: $gray-color;
    border-radius: 0px 0px 12px 12px;
    margin-bottom: 16px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
}
</style>
