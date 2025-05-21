<template>
  <details class="mutation">
    <summary class="mutation__header">
      <dl class="mutation__title" :title="mutation.mutationId">
        <dt>Мутация:</dt>
        <dd>{{ mutation.mutationId }}</dd>
      </dl>

      <dl>
        <dt>Тип мутации:</dt>
        <dd>{{ mutation.mutationType }}</dd>
      </dl>

      <dl>
        <dt>Тир:</dt>
        <dd>{{ mutation.maybeHighestTier || "Не задан" }}</dd>
      </dl>

      <slot />
    </summary>

    <div class="mutation__details">
      <div class="mutation__info">
        <p>
          <strong>Частота:</strong>
          {{ (mutation.organizationFrequencyRatio * 100).toFixed(3) }}%
        </p>
        <p>
          <strong>Статус:</strong>
          {{
            mutation.isAnnotatedByAmp ? "Подтверждено AMP" : "Требует проверки"
          }}
        </p>
      </div>

      <div
        v-if="mutation.therapeuticAnnotations.length"
        class="mutation__recommendations"
      >
        <h3>Клинические рекомендации</h3>
        <div
          v-for="(therapy, index) in mutation.therapeuticAnnotations"
          :key="index"
          class="mutation__therapy therapy"
          :class="{
            'therapy--resistant': therapy.sensitivity === 'RESISTANT',
          }"
        >
          <p><strong>Тип опухоли:</strong> {{ therapy.tumorType }}</p>
          <p>
            <strong>Препарат:</strong> {{ therapy.drugTradeName }} ({{
              therapy.drugName
            }})
          </p>
          <p>
            <strong>Эффективность:</strong>
            <span> {{ formatSensitivity(therapy.sensitivity) }}</span>
          </p>
          <p>
            <strong>Уровень доказательности:</strong>
            {{ therapy.evidenceLevel }}
          </p>

          <div
            v-if="therapy?.referenceLinks?.length"
            class="therapy__references"
          >
            <div class="therapy__links">
              <a
                class="therapy__link"
                v-for="(link, i) in therapy.referenceLinks"
                :key="link"
                :href="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Исследование {{ i + 1 }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </details>
</template>

<script lang="ts" setup>
import { Mutation } from "@/shared/types/mutation";

const { mutation } = defineProps<{
  mutation: Mutation;
}>();

const formatSensitivity = (sens: string): string => {
  const sensitivityMap: Record<string, string> = {
    RESISTANT: "Резистентность ❌",
    SUSCEPTIBLE: "Чувствительность ✅",
  };
  return sens ? sensitivityMap[sens] || "Не исследована" : "Не исследована";
};
</script>

<style lang="scss" scoped>
.mutation {
  background: $white-color;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 16px;

  &:hover {
    background: rgb(216, 216, 216);
  }

  &__header {
    display: grid;
    grid-template-columns: auto 200px 100px;
    gap: 16px;
    position: relative;
    cursor: pointer;
  }

  &__title dd {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 500px;
  }

  &__details {
    margin-block: 5px;
  }

  &__recommendations {
    margin-top: 5px;
  }
}

.therapy {
  padding: 12px;
  margin: 8px 0;
  border-left: 4px solid #2196f3;

  &--resistant {
    border-left-color: #f44336;
  }

  &__references {
    margin-top: 8px;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
  }

  &__link {
    color: #3f51b5;
  }
}
</style>
