<template>
  <div class="p-4">
    <div>
      <Tabs v-model="currentTab.value" :items="items"></Tabs>
      <div class="p-2 border-green-500 border-1 mt-4 rounded h-490px">
        <div class="flex flex-col gap-2">
          <div
            v-for="item in currentTab?.data.cursor.value"
            class="bg-black p-2 bg-green-900 rounded"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!-- <PageContainer
        class="mt-4"
        :page="pageIndex"
        @next="handlePageNext"
        :total="total"
        :is-paused="false"
      ></PageContainer> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Tabs, { Item } from "../components/Tabs.vue";
// import PageContainer from "../components/PageContainer.vue";
import { onDeactivated } from "vue";
import { LinkedList } from "../utils/LinkedList";
import { DataItem, getMockData } from "../apis";
import { chunk } from "es-toolkit";
import { computed } from "vue";
// const tabIndex = ref(0);
const total = ref(4);
// const paused = ref(false);

const items: Item[] = [
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
const tabsLinkedList = ref<
  LinkedList<{
    data: LinkedList<DataItem[]>;
    label: string;
    value: number;
  }>
>();

const currentTab = computed(() => {
  return tabsLinkedList.value?.cursor.value;
});
async function fetchData() {
  const data = await Promise.all(
    items.map(async (item) => {
      const result = await getMockData(item.value);
      const chunkList = chunk(result, 10);
      return {
        ...item,
        data: new LinkedList(chunkList),
      };
    })
  );
  tabsLinkedList.value = new LinkedList(data);
}
fetchData();
// const linkedList = new LinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const timer = setInterval(() => {
  //   tabIndex.value = (tabIndex.value + 1) % items.length;
  const currentTabsNode = tabsLinkedList.value?.cursor;
  if (currentTabsNode) {
    currentTabsNode.value.data.next();
    // currentTabsNode.value.data.next();
  }
  //   tabsLinkedList.value?.next();
  //   tabsLinkedList.value.
}, 3000);
onDeactivated(() => {
  clearInterval(timer);
});
</script>
<style lang="scss"></style>
