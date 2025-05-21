import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiRequest } from "@/shared/api/api";
import { Mutation } from "@/shared/types/mutation";

export const useMutationsStore = defineStore("MutationStore", () => {
  const allMutations = ref<Mutation[]>([]);
  const searchQuery = ref("");
  const pageSize = 20;

  async function fetchMutations() {
    try {
      const response = await apiRequest<{ resources: Mutation[] }>(
        `/mutations?pageZeroBasedNumber=${
          allMutations.value.length / pageSize
        }&pageSize=${pageSize}`
      );
      allMutations.value = [...allMutations.value, ...response.resources];
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }

  const filteredMutations = computed(() => {
    if (!searchQuery.value) return allMutations.value;

    return allMutations.value.filter((mutation) =>
      mutation.mutationId
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    allMutations,
    searchQuery,
    fetchMutations,
    filteredMutations,
  };
});
