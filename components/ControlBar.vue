<script setup lang="ts">
    
</script>

<template>
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
            <div class="progress-container">
                <small>0:05</small>
                <div class="progress-bar">
                    <div class="progress-filler"></div>
                </div>
                <small>3:28</small>
            </div>
        </section>
    </aside>
</template>

<style scoped>
aside {
    background: var(--dark-accent);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

section {
    flex: 1;
}

.control-bar {
    flex: 2;
    display: flex;
    align-items: stretch;
}

.meta-bar {
    display: flex;
    align-items: center;
}

.meta-bar b {
    display: block;
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
</style>