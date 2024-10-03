<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

// Handle form submission to navigate with query param
const handleSearch = (event: Event) => {
  event.preventDefault(); // Prevent default form action

  // Redirect to the results page with the query as a parameter
  if (searchQuery.value) {
    router.push({ 
      path: '/results', 
      query: { query: searchQuery.value } 
    });
  }
};
</script>

<template>
    <div class="bg-gray-100 h-screen flex flex-col justify-center items-center">
        <!-- Logo (GuluGulu text) -->
        <div class="mb-8">
            <h1 class="text-6xl font-bold text-gray-700">GuluGulu</h1>
        </div>

        <!-- Search box -->
        <div class="w-full max-w-md">
            <form @submit="handleSearch">
                <div class="relative">
                    <input type="text" v-model="searchQuery" class="w-full border border-gray-300 rounded-full px-6 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Search GuluGulu or type a URL">
                    <button type="submit" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm7.318 12.905a9 9 0 1 1 1.182-1.182l4.35 4.35a.75.75 0 1 1-1.061 1.06l-4.35-4.35a9.03 9.03 0 0 1-.121-.878z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>

        <!-- Buttons below the search box -->
        <div class="mt-8 space-x-4">
            <router-link to="/results?query=Timnas Indonesia" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg">
                Timnas Indonesia
            </router-link>
            <router-link to="/results?query=Tutorial Coding" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg">
                Tutorial Coding
            </router-link>
            <router-link to="/results?query=Docker" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg">
                Docker
            </router-link>
            <router-link to="/results?query=Mengenal Software" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg">
                Mengenal Software
            </router-link>
        </div>
    </div>
</template>

<style scoped>

</style>