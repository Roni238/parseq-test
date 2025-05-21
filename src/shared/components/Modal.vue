<template>
  <transition name="modal">
    <div
      v-if="modelValue"
      class="modal"
      @click.self="emit('update:modelValue', false)"
    >
      <div class="modal__container">
        <button
          class="modal__close-button"
          @click="emit('update:modelValue', false)"
        >
          &times;
        </button>

        <div class="modal__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &__container {
    max-height: 90%;
    //overflow: hidden auto;
    position: relative;
    background-color: $white-color;
    padding: 16px;
    border-radius: 8px;
    max-width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &__close-button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    color: #666;
    transition: color 0.2s;

    &:hover {
      color: $red-color;
    }
  }
  &__content {
    margin-top: 10px;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
</style>
