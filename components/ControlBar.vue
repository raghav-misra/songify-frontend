<script setup lang="ts">
const progressBarWidth = computed(() => player.length === 0 ? 0 : (player.currentPosition * 100 / player.length));

function transformTime(time: number) {
    const min = Math.floor(time / 60).toString();
    const sec = Math.floor(time % 60).toString();
    return `${min}:${sec.length < 2 ? `0${sec}` : sec}`;
}

const showQueueDialog = ref(false);
</script>

<template>
    <Transition name="page">
        <ModalDialog v-if="showQueueDialog" max-height>
            <header class="modal-heading">
                <h2><b>queue:</b></h2>
                <button class="button icon" style="margin-left: auto;" @click="showQueueDialog = false;">
                    <span class="material-icons-round">
                        close
                    </span>

                </button>
            </header>
            <div v-for="song in queue" :key="song.id">
                <SongDisplay :song="song" :is-in-queue="true" />
            </div>
        </ModalDialog>
    </Transition>

    <aside>
        <section class="meta-bar">
            <div class="thumbnail">
                <img v-if="player.song?.thumbnail" :src="player.song.thumbnail">
            </div>
            <div>
                <b>{{ player.song?.title || "bruh im done" }}</b>
                <small>{{ player.song?.artist || "play a song already" }}</small>
            </div>
        </section>

        <section class="control-bar">
            <div class="actions">
                <button class="button icon" title="view queue" @click="showQueueDialog = true;">
                    <span class="material-icons-round">
                        queue_music
                    </span>
                </button>
                <button class="button icon" title="previous" @click="queueManager.movePrevious">
                    <span class="material-icons-round">
                        fast_rewind
                    </span>
                </button>
                <button class="button icon" title="play / pause" @click="queueManager.togglePlay">
                    <span v-if="player.paused || !player.playing" class="material-icons-round">
                        play_arrow
                    </span>
                    <span v-else class="material-icons-round">
                        pause
                    </span>
                </button>
                <button class="button icon" title="next" @click="queueManager.moveNext">
                    <span class="material-icons-round">
                        fast_forward
                    </span>
                </button>
                <button class="button icon" title="loop song" @click="player.looping = !player.looping"
                    :class="[player.looping && 'is-active']">
                    <span class="material-icons-round">
                        repeat_one
                    </span>
                </button>
            </div>
            <div class="progress-container">
                <small>{{ transformTime(player.currentPosition) }}</small>
                <div class="progress-bar">
                    <div class="progress-filler" :style="`width: ${progressBarWidth}%;`"></div>
                </div>
                <small>{{ transformTime(player.length) }}</small>
            </div>
        </section>

        <section></section>
    </aside>
</template>

<style scoped>
aside {
    background: var(--dark-accent);
    display: flex;
    justify-content: space-between;
    /* flex-direction: column;   */
    align-items: stretch;
    padding: 1rem;
}

section {
    flex: 1;
}

.meta-bar {
    display: flex;
    align-items: center;
}

.meta-bar b {
    display: block;
}

.control-bar {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: min(100%, 768px);
}

.control-bar .actions {
    margin: 0 auto;
    margin-bottom: 0.5rem;
}

.control-bar .actions>* {
    margin: 0 0.5rem;
}

.progress-container {
    display: flex;
    flex: 1;
    align-items: center;
}

.progress-bar {
    background: var(--dark);
    height: 0.8rem;
    border-radius: 10px;
    margin: 0 0.5rem;
    width: 100%;
    display: flex;
    align-items: stretch;
    overflow: hidden;
}

.progress-filler {
    width: 50%;
    background: var(--alt);
    border-radius: 10px;
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
    border: 2px var(--dark) solid;
}

.thumbnail img {
    height: calc(3.75rem * 1.33333333);
}

.modal-heading {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>