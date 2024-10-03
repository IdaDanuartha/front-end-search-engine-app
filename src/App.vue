<script setup lang="ts">
import { useArticleStore } from "./stores/Article";
import { onMounted } from "vue";
 
const article = useArticleStore()

onMounted(() => {
  article.getAll()
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
