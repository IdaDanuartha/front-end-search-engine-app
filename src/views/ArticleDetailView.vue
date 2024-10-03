<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '../stores/Article'; // Assuming you have a store to fetch articles

const route = useRoute();
const articleStore = useArticleStore();

const loading = ref(true);

// Fetch article data based on the route parameter
const fetchArticle = async () => {
    loading.value = true;

    const slug = route.params.slug; // Get the article slug from the route parameters
    await articleStore.getBySlug(slug); // Fetch article from the store using the slug
    
    loading.value = false;
};

// Fetch the article when the component is mounted
onMounted(() => {
  fetchArticle();
});
</script>

<template>
    <div class="bg-gray-100 text-gray-800">
      <!-- Header Section -->
      <header class="bg-white shadow-sm py-4 px-6">
        <div class="max-w-4xl mx-auto flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-700">Article Detail</h1>
          <router-link :to="{ name: 'SearchResult' }" class="text-blue-600 hover:underline">Back to Search</router-link>
        </div>
      </header>
  
      <!-- Main Content -->
      <main v-if="!loading" class="max-w-4xl mx-auto py-10 px-6 bg-white shadow-md rounded-lg mt-6">
        <!-- Article Title -->
        <h2 class="text-4xl font-bold text-gray-800 mb-4">{{ articleStore.article.title }}</h2>
  
        <!-- Meta Information -->
        <div class="text-sm text-gray-500 mb-6">
          <span>Published on {{ new Date(articleStore.article.published_at).toLocaleDateString() }}</span> | 
          <span>Author: {{ articleStore.article.author }}</span>
        </div>
  
        <!-- Article Content -->
        <article class="prose prose-lg max-w-none">
            <!-- Optional: Article Image -->
            <img width="100%" v-if="articleStore.article.thumbnail_img" :src="articleStore.article.thumbnail_img" alt="Article Image" class="my-8 rounded-lg shadow-lg">

            <div div v-html="articleStore.article.content"></div>
  
        </article>
      </main>
  
      <!-- Loader (when article is being fetched) -->
      <div v-else class="flex justify-center items-center h-64">
        <div class="loader"></div>
      </div>
  
      <!-- Footer -->
      <footer class="bg-gray-800 py-6 mt-10">
        <div class="max-w-4xl mx-auto text-center text-gray-300 text-sm">
          © 2024 example.com. All rights reserved.
        </div>
      </footer>
    </div>
</template>  

<style scoped>

</style>