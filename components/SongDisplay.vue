<script setup lang="ts">
const props = defineProps<{
    song: ISongData;
    queueSongPosition?: number;
}>();

const showModal = ref(false);

function removeFromQueue() {
    if (props.queueSongPosition !== undefined) {
        queue.value.splice(props.queueSongPosition, 1);
    }
}
</script>

<template>
    <Transition name="page">
        <ModalDialog v-if="showModal" custom-class="options-modal">
            <header class="nav-item modal-heading">
                <div class="song-meta">
                    <b>{{ song.title }}</b>
                    <small>{{ song.artist }}</small>
                </div>

                <button class="button icon" style="margin-left: auto;" @click="showModal = false;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </header>
            <button class="nav-item clickable" @click="queueManager.playNow(song); showModal = false;">
                play it!
            </button>
            <button class="nav-item clickable" @click="queueManager.playNext(song); showModal = false;">
                play it next.
            </button>
            <button 
                v-if="typeof queueSongPosition === 'number'" 
                class="nav-item clickable" 
                @click="removeFromQueue(); showModal = false;"
            >
                remove from queue.
            </button>
            <button v-else
                class="nav-item clickable" 
                @click="queueManager.addToQueue(song); 
                showModal = false;">
                add to queue.
            </button>
            <button class="nav-item clickable add-playlist">
                add to
                <select>
                    <option value="" disabled selected hidden>(choose a playlist)</option>
                    <option value="sauce">sauce</option>
                </select>
            </button>
        </ModalDialog>
    </Transition>

    <div class="song-result" :key="song.id">
        <button class="button icon icon-left" @click="queueManager.playNow(song)">
            <i class="fa-solid fa-play"></i>
        </button>
        <div class="thumbnail">
            <img :src="song.thumbnail">
        </div>
        <div>
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
        </div>
        <button class="button icon" style="margin-left: auto;" @click="showModal = true;">
            <i class="fa-solid fa-ellipsis"></i>
        </button>
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
    margin-left: -0.325rem;
}
</style>