<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArticleStore } from '../stores/Article';
import { buildIndex } from '../config/lunrConfig'; // Import the Lunr config

const route = useRoute();
const router = useRouter();
const query = ref('');
const loading = ref(true);
const articleStore = useArticleStore();
const searchQuery = ref('');
const searchResults = ref([]);
let submittedQuery = ref('');

searchQuery.value = route.query.query;

// Function to fetch articles and build the Lunr.js index
const fetchResults = async () => {
    loading.value = true;
    await articleStore.getAll(searchQuery.value); // Fetch articles based on the query
    setTimeout(() => {
        loading.value = false; // Hide loader after 1 second
    }, 100);

    const articles = articleStore.articles;

    // Build the Lunr index
    const index = buildIndex(articles);

    // Search in the index
    if (searchQuery.value) {
        searchResults.value = index.search(searchQuery.value).map(result => {
        return articles[result.ref];
        });
    } else {
        searchResults.value = articles;
    }

    submittedQuery.value = searchQuery.value;

    articles.forEach((article, index) => {
        console.log(`Score simmilarity index artikel ke-${index+1} : ${article.score}`);
    });
    console.log("----------------------------------------------------------------")
};

// Handle form submission to navigate with query param
const handleSearch = (event: Event) => {
  event.preventDefault();

  // Redirect to the results page with the query as a parameter
  if (searchQuery.value) {
    router.push({
      path: '/results',
      query: { query: searchQuery.value },
    });
    fetchResults();
  }
};

// Fetch results when component is mounted
onMounted(() => {
  query.value = route.query.query as string; // Get the query from the route
  fetchResults();
});

const highlightText = (text, search) => {
    if (!search) return text;

    // Split the search query into individual words
    const words = search.trim().split(/\s+/);

    // Create a regular expression to match each word separately, ignoring case
    const regex = new RegExp(`(${words.join('|')})`, 'gi');

    // Replace matched words with highlighted <mark> tag
    return text.replace(regex, '<mark>$1</mark>');
};

</script>

<template>
    <div class="bg-white text-gray-800">
  
      <!-- Search Bar -->
      <header class="flex justify-between items-center py-4 px-6 border-b">
        <router-link :to="{ name: 'Home' }" class="flex items-center">
          <h1 class="text-3xl font-bold text-gray-700">GuluGulu</h1>
        </router-link>
        <div class="flex-1 mx-8">
          <form @submit="handleSearch">
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                class="w-full border border-gray-300 rounded-full px-6 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search GuluGulu or type a URL"
              />
              <button type="submit" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm7.318 12.905a9 9 0 1 1 1.182-1.182l4.35 4.35a.75.75 0 1 1-1.061 1.06l-4.35-4.35a9.03 9.03 0 0 1-.121-.878z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </header>
  
      <!-- Loader -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="loader"></div>
      </div>
  
      <!-- Main Content: Search Results -->
      <main v-else class="px-6 py-6 max-w-4xl mx-auto">
        <p class="text-sm text-gray-500 mb-4">Showing {{ searchResults.length }} results</p>
  
        <div class="space-y-6">
          <div
            v-for="article in searchResults"
            :key="article.id"
            class="result border-b pb-6"
          >
            <router-link :to="{ name: 'ArticleDetail', params: { slug: article.slug } }" class="text-sm text-green-700">https://www.example.com</router-link>
            <h2 class="text-xl text-blue-600 hover:underline">
              <router-link
                :to="{ name: 'ArticleDetail', params: { slug: article.slug } }"
                v-html="highlightText(article.title, submittedQuery)"
              ></router-link>
            </h2>
            <p class="text-sm text-gray-600 mt-2" v-html="highlightText(article.short_description, submittedQuery)"></p>
          </div>
        </div>
      </main>
    </div>
  </template>
   

<style scoped>
.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>