<script setup lang="ts">
const props = defineProps<{
    song: ISongData;
    isInQueue?: boolean;
}>();

const showOptionsModal = ref(false);
const playlistToAddTo = ref("");

const ownedPlaylists = computed(() => playlists.value.filter(p => p.userId === userState.user._id));

function removeFromQueue() {
    if (props.isInQueue) {
        const index = queue.value.findIndex(s => s.id === props.song.id);
        if (index > -1) {
            queue.value.splice(index, 1);
        }
    }
}

async function addToPlaylist() {
    if (playlistToAddTo.value === "") return;
    showOptionsModal.value = false;
    await api("POST")(`/playlists/${playlistToAddTo.value}/songs`, {
        song: props.song
    });
    playlistToAddTo.value = "";
}
</script>

<template>
    <Transition name="page">
        <ModalDialog v-if="showOptionsModal" custom-class="options-modal">
            <header class="nav-item modal-heading">
                <div class="song-meta">
                    <b>{{ song.title }}</b>
                    <small>{{ song.artist }}</small>
                </div>

                <button class="button icon" style="margin-left: auto;" @click="showOptionsModal = false;">
                    <span class="material-icons-round">
                        close
                    </span>
                </button>
            </header>
            <button class="nav-item clickable" @click="queueManager.playNow(song); showOptionsModal = false;">
                play it!
            </button>
            <button class="nav-item clickable" @click="queueManager.playNext(song); showOptionsModal = false;">
                play it next.
            </button>
            <button v-if="isInQueue" class="nav-item clickable"
                @click="removeFromQueue(); showOptionsModal = false;">
                remove from queue.
            </button>
            <button v-else class="nav-item clickable" @click="queueManager.addToQueue(song);
            showOptionsModal = false;">
                add to queue.
            </button>
            <button class="nav-item clickable add-playlist">
                add to
                <select v-model="playlistToAddTo" @change="addToPlaylist">
                    <option value="" disabled selected hidden>(choose a playlist)</option>
                    <option v-for="playlist in ownedPlaylists" :value="playlist.playlistId">
                        {{ playlist.name }}
                    </option>
                </select>
            </button>
        </ModalDialog>
    </Transition>

    <div class="song-result" :key="song.id">
        <button class="button icon icon-left" @click="queueManager.playNow(song)">
            <span class="material-icons-round">
                play_arrow
            </span>
        </button>

        <button class="button icon-left" @click="showOptionsModal = true;">
            <span class="material-icons-round">
                more_horiz
            </span>
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

.modal-heading {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.modal-heading .song-meta {
    display: flex;
    flex-direction: column;
}

.add-playlist select {
    padding: 0;
    border: none;
}
</style>