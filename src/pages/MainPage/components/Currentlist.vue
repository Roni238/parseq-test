<template>
  <div class="current-list">
    <header class="current-list__header">
      <template v-if="!isEditing">
        <h1>{{ listStore.currentList.name }}</h1>
        <p
          class="current-list__discription"
          :class="{
            'current-list__discription--gray-color':
              !listStore.currentList.description,
          }"
        >
          {{ listStore.currentList.description || "Описание отсутствует" }}
        </p>
        <button @click="togglePatchMode">Редактировать коллекцию</button>
      </template>

      <template v-else>
        <input
          maxlength="40"
          v-model="editData.name"
          type="text"
          class="current-list__edit-input"
          placeholder="Название категории"
        />
        <textarea
          maxlength="255"
          v-model="editData.description"
          class="current-list__edit-textarea"
          placeholder="Описание категории"
        ></textarea>
      </template>

      <div class="current-list__btns">
        <button class="current-list__btn--delete" @click="toggleDeleteMode">
          Удалить категорию
        </button>
        <button class="current-list__btn--close" @click="toggleEditMode">
          {{ isEditing ? "Сохранить" : "Редактировать категорию" }}
        </button>
      </div>
    </header>

    <dl
      class="current-list__mutation"
      v-for="mutation in listStore.currentList.mutations"
      :key="mutation"
    >
      <dt>Мутация:</dt>
      <dd>{{ mutation }}</dd>
    </dl>

    <Modal class="delete-modal" v-model="isDeleteModalOpen">
      <h3>
        Вы действительно хотите удалить "{{ listStore.currentList.name }}"?
      </h3>
      <div class="delete-modal__btns">
        <button class="delete-modal__btn--delete" @click="deleteList">
          Удалить
        </button>
        <button class="delete-modal__btn--close" @click="toggleDeleteMode">
          Закрыть
        </button>
      </div>
    </Modal>

    <Modal class="current-list__patch-modal" v-model="isPatchModalOpen">
      <MutationModal @close="isPatchModalOpen = false" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import Modal from "@/shared/components/Modal.vue";
import MutationModal from "@/shared/components/MutationModal.vue";
import { ref, reactive, watch } from "vue";

import { useListsStore } from "@/shared/stores/listsStore";
const listStore = useListsStore();

//логика удаления
const isDeleteModalOpen = ref(false);
const toggleDeleteMode = () =>
  (isDeleteModalOpen.value = !isDeleteModalOpen.value);
const deleteList = () => {
  listStore.deleteList();
  toggleDeleteMode();
};

//логира изминения коллекции
const isPatchModalOpen = ref(false);
const togglePatchMode = () =>
  (isPatchModalOpen.value = !isPatchModalOpen.value);

//логика редактирования списка
const isEditing = ref(false);
const editData = reactive({
  name: listStore.currentList.name,
  description: listStore.currentList.description,
});
const toggleEditMode = () => {
  if (isEditing.value) {
    listStore.setListSettings(editData.name, editData.description);
  }
  isEditing.value = !isEditing.value;
};

watch(
  () => listStore.currentList.name,
  () => {
    isEditing.value = false;
  }
);
</script>

<style lang="scss" scoped>
.current-list {
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

  &__btns {
    display: flex;
    position: absolute;
    top: 20px;
    right: 20px;
    gap: 8px;
  }

  &__btn {
    &--close {
      &:hover {
        background: $green-color;
      }
    }
    &--delete {
      &:hover {
        background: $red-color;
      }
    }
  }

  &__discription {
    color: $white-color;
    margin-bottom: 20px;
    max-width: 700px;
    word-break: break-word;

    &--gray-color {
      color: #444;
    }
  }

  &__edit {
    &-input {
      max-width: 300px;
      padding: 8px;
      width: 100%;
      margin-bottom: 12px;
      font-size: 1.2rem;
    }
    &-textarea {
      max-width: 500px;
      width: 100%;
      padding: 8px;
      height: 100px;
      resize: none;
      font-size: 1.2rem;
    }
  }

  &__mutation {
    background: $white-color;
    border-radius: 12px;
    padding: 8px;
    margin-bottom: 16px;
  }
}

.delete-modal {
  &__btns {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  &__btn {
    &--close {
      &:hover {
        background: $green-color;
      }
    }
    &--delete {
      &:hover {
        background: $red-color;
      }
    }
  }
}
</style>
