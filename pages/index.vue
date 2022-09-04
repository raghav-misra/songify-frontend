<script setup lang="ts">
const searchQuery = ref("");
const results = ref<ISongData[]>([]);

watch(() => searchQuery.value, async () => {
    if (searchQuery.value.length < 3) return;

    const searchResponse = await api("GET")<{
        success: boolean;
        songs: ISongData[];
    }>(`/search/${encodeURIComponent(searchQuery.value)}`);

    if (searchResponse.success) {
        results.value = searchResponse.songs;
    }
});
</script>

<template>
    <AppView class="container">
        <h1>find music...</h1>

        <input v-model.trim="searchQuery" type="text" placeholder="🔍 mans not hot...">

        <div v-if="results.length === 0">
            <h2>search results show up here!</h2>
            <p>make sure your search query is 3 or more characters</p>
        </div>

        <SongDisplay v-for="song in results" :key="song.id" :song="song" />
    </AppView>
</template>

<style scoped>
input {
    padding: 0.5rem;
    font-size: 1.25rem;
}
</style>