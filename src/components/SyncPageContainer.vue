<template>
  <video
    v-show="showVideo"
    ref="videoRef"
    :controls="true"
    disable-picture-in-picture
    loop
    autoplay
    class="w-100vw h-100vh fixed z-99 object-cover"
  >
    Your browser does not support the video tag.
  </video>
  <div class="sync-page-container flex gap-4">
    <PageContainer
      :page="page1"
      @next="handlePage1Next"
      :total="total1"
      :is-paused="isPaused1"
    ></PageContainer>
    <PageContainer
      :page="page2"
      @next="handlePage2Next"
      :total="total2"
      :is-paused="isPaused2"
    ></PageContainer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

import PageContainer from "./PageContainer.vue";

// 全局监听tab键点击事件 并阻止其默认行为
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    showVideo.value = !showVideo.value;
    e.preventDefault();
  }
});

const showVideo = ref(false);

const videoRef = ref<HTMLVideoElement>();
onMounted(() => {
  if (videoRef.value) {
    // 禁音后才能自动播放
    videoRef.value.muted = true;
    videoRef.value.play();
  }
});

const total1 = 2;
const total2 = 2;

const page1 = ref(0);
const page2 = ref(0);

const isPaused1 = ref(false);
const isPaused2 = ref(false);

const isNeedLink = total1 > 1 && total2 > 1;

function handlePage1Next() {
  page1.value = (page1.value + 1) % total1;
  if (isNeedLink) {
    // 如果2为暂停
    if (isPaused2.value) {
      startLooper();
    } else {
      // 否则暂停当前
      isPaused1.value = true;
    }
  } else {
    // 如果非联动状态 ,手动翻页后将重置计时器
    startLooper();
  }
}
function handlePage2Next() {
  page2.value = (page2.value + 1) % total2;
  if (isNeedLink) {
    // 如果2为暂停
    if (isPaused1.value) {
      startLooper();
    } else {
      // 否则暂停当前
      isPaused2.value = true;
    }
  } else {
    startLooper();
  }
}

let timer: number;

// 页码自增逻辑
function autoIncrement() {
  if (!isPaused1.value) {
    page1.value = (page1.value + 1) % total1;
  }
  if (!isPaused2.value) {
    page2.value = (page2.value + 1) % total2;
  }
}
watch([page1, page2], () => {
  if (page1.value === page2.value) {
    isPaused1.value = false;
    isPaused2.value = false;
    startLooper();
  }
});

function startLooper() {
  clearInterval(timer);
  timer = setInterval(autoIncrement, 1000 * 5);
}

startLooper();
</script>
