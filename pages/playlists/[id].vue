<script setup lang="ts">
const currentPlaylist = ref<IPlaylist | null>(null);
const router = useRouter();
const route = useRoute();

onMounted(async () => {
    const getDetailsResult = await api("GET")<{
        success: boolean;
        playlist: IPlaylist;
    }>(`/playlists/${route.params.id}`);

    if (getDetailsResult.success) {
        currentPlaylist.value = getDetailsResult.playlist;
    } else {
        router.push("/");
    }
});

function startPlaylist() {
    if (currentPlaylist.value) {
        queueManager.addToQueue(...currentPlaylist.value.songs);
        queueManager.moveNext();
    }
}
</script>

<template>
    <AppView class="container" v-if="currentPlaylist">
        <header>
            <h1><b>{{ currentPlaylist.name }}</b> <small>(by {{ currentPlaylist.username }})</small></h1>
            <p>{{ currentPlaylist.songs.length }} songs</p>
        </header>

        <div class="actions">
            <button 
                class="button solid" 
                style="--accent: var(--alt);" 
                @click="startPlaylist"
            >
                play
            </button>
            <button class="button solid" style="--accent: var(--main);">
                shuffle
            </button>
        </div>

        <SongDisplay v-for="song in currentPlaylist.songs" :key="song.id" :song="song" />

        <div v-if="currentPlaylist.songs.length === 0">
            <p>
                your playlist is empty, why don't we
                <NuxtLink to="/" style="color: var(--alt);">find some songs?</NuxtLink>
            </p>
        </div>
    </AppView>
</template>

<style scoped>

</style>