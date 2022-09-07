<script setup lang="ts">
const currentPlaylist = ref<IPlaylist | null>(null);

const isForeign = computed(() => currentPlaylist.value?.userId !== userState.user._id);

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

function startPlaylist(shuffle: boolean) {
    if (!currentPlaylist.value) return;

    queue.value = [];

    if (shuffle) {
        queueManager.addToQueue(...shuffleArray([...currentPlaylist.value.songs]));
    } else {
        queueManager.addToQueue(...currentPlaylist.value.songs);
    }

    queueManager.moveNext();
}

async function subscribePlaylist() {
    if (!currentPlaylist.value) return;
    if (playlists.value.findIndex(p => p.playlistId === currentPlaylist.value?._id) > -1) return;

    const subResponse = await api("POST")<{
        success: boolean;
    }>(`/playlists/${currentPlaylist.value._id}/subscribe`);

    if (subResponse.success) {
        playlists.value.push({
            name: currentPlaylist.value.name,
            userId: currentPlaylist.value.userId,
            playlistId: currentPlaylist.value._id,
        });
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
            <button class="button solid" style="--accent: var(--alt);" @click="startPlaylist(false)">
                <span class="icon-left material-icons-round">
                    play_arrow
                </span>
                play
            </button>
            <button class="button solid" style="--accent: var(--main);" @click="startPlaylist(true)">
                <span class="icon-left material-icons-round">
                    shuffle
                </span>
                shuffle
            </button>

            <template v-if="isForeign">
                <button class="button solid" style="--accent: var(--gray);" @click="subscribePlaylist">
                    <span class="icon-left material-icons-round"> playlist_add_check </span>
                    subscribe
                </button>
            </template>
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