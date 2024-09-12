<template>
  <div
    @click="handleNextPage"
    class="cursor-pointer relative flex justify-between gap-1 overflow-hidden flex-col w-400px h-full h-600px border-1 rounded-xl flex items-center justify-center text-2xl bg-gray-700"
  >
    <div
      class="w-full flex justify-center relative items-center"
      :class="{
        'bg-green-600': state === 'RUNNING',
        'bg-red-400': state === 'PAUSE',
      }"
    >
      page={{ page }} {{ state }}
      <div class="text-xs absolute right-12px">{{ countdown }}/5</div>
    </div>
    <div
      class="text-150px w-full h-full absolute flex items-center justify-center"
    >
      {{ page }} /{{ total - 1 }}
    </div>
    <div
      v-for="row in 10"
      class="row bg-gray-800 w-full h-full flex items-center p-4 opacity-50"
    >
      <div class="text-xl font-bold">{{ page * 10 + row }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { watch, ref, computed } from "vue";

const props = defineProps<{
  page: number;
  state: "PAUSE" | "RUNNING";
  total: number;
}>();
const emits = defineEmits<{
  (e: "next"): void;
  (e: "prev", page: number): void;
}>();
let startTime = Date.now();
const now = ref(Date.now());
setInterval(() => {
  if (props.state === "RUNNING") {
    now.value = Date.now();
  }
}, 200);
const countdown = computed(() => 5 - Math.ceil((now.value - startTime) / 1000));
watch(
  () => [props.state, props.page],
  () => {
    startTime = Date.now();
  }
);

function handleNextPage() {
  startTime = Date.now();
  emits("next");
}
</script>
