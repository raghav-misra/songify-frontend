<script setup lang="ts">
const props = defineProps<{
    song: ISongData
}>();
</script>

<template>
    <div class="song-result" :key="song.id">
        <button class="button icon icon-left" @click="playImmediately(song)">
            <i class="fa-solid fa-play"></i>
        </button>
        <div class="thumbnail">
            <img :src="song.thumbnail">
        </div>
        <div>
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
        </div>
    </div>
</template>

<style scoped>
.song-result {
    display: flex;
    align-items: center;
}

.thumbnail {
    height: 3.75rem;
    min-width: 3.75rem;
    max-width: 3.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-right: 1rem;
    border-radius: 5px;
}

.thumbnail img {
    height: calc(3.75rem * 1.33333333);
}
</style>