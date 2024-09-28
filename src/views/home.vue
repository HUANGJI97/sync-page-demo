<template>
  <div class="flex w-full h-full flex justify-center items-center gap-4">
    <div class="button">
      <RouterLink to="/sync">SyncPage</RouterLink>
    </div>
    <div class="button">
      <RouterLink to="/linkedList">DoubledLinkedList</RouterLink>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.button {
  @apply w-200px h-50px bg-green-500 flex items-center justify-center rounded cursor-pointer;
  &:hover {
    @apply bg-green-600;
  }
}
</style>
