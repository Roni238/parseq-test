import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiRequest } from "@/shared/api/api";
import { List } from "@/shared/types/list";

export const useListsStore = defineStore("listsStore", () => {
  const allLists = ref<List[]>([]);
  const searchQuery = ref("");
  const currentList = ref<List>({
    name: "",
    description: "",
    mutations: [],
  });

  const setCurrentList = (list: List) => (currentList.value = list);

  const setListSettings = (listName: string, listDescription: string) => {
    //тут должен быть запрос но api нет
    currentList.value.name = listName;
    currentList.value.description = listDescription;
  };

  const filteredLists = computed(() => {
    if (!searchQuery.value) return allLists.value;

    return allLists.value.filter((list) =>
      list.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  async function fetchList() {
    try {
      const response = await apiRequest<List[]>("/lists");
      allLists.value = response;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }

  async function createList(newlist: string) {
    try {
      await apiRequest(
        `/lists/create?name=${encodeURIComponent(newlist)}`,
        "POST"
      );

      allLists.value.push({
        name: newlist,
        description: "",
        mutations: [],
      });
      setCurrentList(allLists.value[allLists.value.length - 1]);
    } catch (error) {
      console.error("Ошибка при создании:", error);
      throw error;
    }
  }

  const deleteList = async () => {
    try {
      await apiRequest(`/lists/${currentList.value.name}`, "DELETE");
      allLists.value = allLists.value.filter(
        (list) => list.name !== currentList.value.name
      );
      setCurrentList(allLists.value[allLists.value.length - 1]);
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  };

  async function patchList(mutationIds: string[]) {
    try {
      await apiRequest(
        `/lists/${currentList.value.name}/mutations`,
        "PATCH",
        mutationIds
      );
      setCurrentList({
        name: currentList.value.name,
        description: currentList.value.description,
        mutations: mutationIds,
      });

      fetchList();
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  }
  return {
    allLists,
    currentList,
    fetchList,
    createList,
    searchQuery,
    filteredLists,
    setListSettings,
    deleteList,
    setCurrentList,
    patchList,
  };
});
