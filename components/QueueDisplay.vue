<script setup lang="ts">
const emit = defineEmits<{
    (e: "close"): unknown;
}>();
</script>

<template>
    <ModalDialog max-height>
        <header class="modal-heading">
            <h2><b>queue:</b></h2>
            <button class="button icon" style="margin-left: auto;">
                <span class="material-icons-round" @click="emit('close')">
                    close
                </span>

            </button>
        </header>
        <div v-for="song in queue" :key="song.id">
            <SongDisplay :song="song" :is-in-queue="true" />
        </div>
    </ModalDialog>
</template>

<style scoped>
.modal-heading {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>