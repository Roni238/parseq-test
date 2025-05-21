<template>
  <div ref="observerRef">
    <div class="loader"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, type Ref } from "vue";

interface ObserverProps {
  action: () => void;
}

const props = defineProps<ObserverProps>();

const observerRef: Ref<HTMLElement | null> = ref(null);

const options: IntersectionObserverInit = {
  rootMargin: "0px",
  threshold: 0.1,
};

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      props.action();
    }
  });
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (observerRef.value) {
    observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(observerRef.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  margin: auto;
  animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
  0% {
    background-color: #fff2;
    box-shadow: 32px 0 #fff2, -32px 0 #fff;
  }
  50% {
    background-color: #fff;
    box-shadow: 32px 0 #fff2, -32px 0 #fff2;
  }
  100% {
    background-color: #fff2;
    box-shadow: 32px 0 #fff, -32px 0 #fff2;
  }
}
</style>
