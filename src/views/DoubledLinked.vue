<template>
  <div>
    <div>
      <Tabs v-model="tabIndex" :items="items"></Tabs>
      <PageContainer
        class="mt-4"
        :page="pageIndex"
        @next="handlePageNext"
        :total="total"
        :is-paused="false"
      ></PageContainer>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Tabs from "../components/Tabs.vue";
import PageContainer from "../components/PageContainer.vue";
import { onDeactivated } from "vue";
import { LinkedList } from "../utils/LinkedList";
import { getMockData } from "../apis";
import { chunk } from "es-toolkit";
const tabIndex = ref(0);
const total = ref(4);
// const paused = ref(false);

const items = [
  { label: "tab1", value: 1 },
  { label: "tab2", value: 2 },
  { label: "tab3", value: 3 },
  { label: "tab4", value: 4 },
  { label: "tab5", value: 5 },
  { label: "tab6", value: 6 },
];
const pageIndex = ref(0);
const handlePageNext = () => {
  pageIndex.value = (pageIndex.value + 1) % total.value;
  //   paused.value = true;
};
async function fetchData() {
  const data = await Promise.all(
    items.map(async (item) => {
      const result = await getMockData(item.value);
      const chunkList = chunk(result, 10);
      return chunkList;
    })
  );
  const llist = new LinkedList(
    data.map((chunkList) => new LinkedList(chunkList))
  );
  debugger;
}
fetchData();
const linkedList = new LinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
let node = linkedList.head;
function each() {
  node = node.next;
  console.log(node);
}

const timer = setInterval(() => {
  tabIndex.value = (tabIndex.value + 1) % items.length;
}, 3000);
onDeactivated(() => {
  clearInterval(timer);
});
</script>
<style lang="scss"></style>
