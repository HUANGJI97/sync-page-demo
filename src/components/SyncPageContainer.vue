<template>
  <div class="sync-page-container flex gap-4">
    <PageContainer
      :page="page1 % total1"
      @next="handlePage1Next"
      :state="state1"
      :total="total1"
    ></PageContainer>
    <PageContainer
      :page="page2 % total2"
      @next="handlePage2Next"
      :total="total2"
      :state="state2"
    ></PageContainer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import PageContainer from "./PageContainer.vue";
enum PAGE_STATE {
  RUNNING = "RUNNING",
  PAUSE = "PAUSE",
}

const total1 = 2;
const total2 = 2;

const page1 = ref(0);
const page2 = ref(0);

const state1 = ref(PAGE_STATE.RUNNING);
const state2 = ref(PAGE_STATE.RUNNING);

function handlePage1Next() {
  page1.value = (page1.value + 1) % total1;
  // 如果另一边面是暂停状态，那么就不暂停当前
  if (state2.value === PAGE_STATE.RUNNING) {
    state1.value = PAGE_STATE.PAUSE;
  } else {
  }
}
function handlePage2Next() {
  page2.value = (page2.value + 1) % total2;
  if (state1.value === PAGE_STATE.RUNNING) {
    state2.value = PAGE_STATE.PAUSE;
  }
}

onMounted(() => {
  setInterval(() => {
    if (state1.value === PAGE_STATE.RUNNING) {
      if (state2.value === PAGE_STATE.PAUSE) {
        if (page1.value === page2.value) {
          state2.value = PAGE_STATE.RUNNING;
        }
      }
      page1.value = (page1.value + 1) % total1;
    }
    if (state2.value === PAGE_STATE.RUNNING) {
      if (state1.value === PAGE_STATE.PAUSE) {
        if (page1.value === page2.value) {
          state1.value = PAGE_STATE.RUNNING;
        }
      }
      page2.value = (page2.value + 1) % total2;
    }
  }, 1000 * 5);
});
</script>
