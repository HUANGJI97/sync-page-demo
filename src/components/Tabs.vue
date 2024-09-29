<template>
  <div class="tabs">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="tabs-item"
      :class="{ active: item.value === value }"
      @click="handleClick(index)"
    >
      {{ item.label }}
    </div>
  </div>
</template>
<script lang="ts" setup>
export type Item = {
  label: string;
  value: number;
};
const value = defineModel<number>({
  default: 0,
});
const { items = [] } = defineProps<{
  items: Item[];
}>();

const handleClick = (index: number) => {
  value.value = index;
};
</script>
<style lang="scss">
.tabs {
  @apply flex  border-1 border-green-500 text-green-500 rounded;
  .tabs-item {
    @apply p-2 items-center flex  w-120px flex justify-center hover:bg-green-500 hover:text-white cursor-pointer select-none;
    &:first-child {
      @apply rounded-l;
    }
    &:last-child {
      @apply rounded-r;
    }
    &.active {
      @apply bg-green-500 text-white;
    }
    transition: all 0.125s;
  }
}
</style>
