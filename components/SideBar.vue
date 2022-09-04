<script setup lang="ts">
const isAddPlaylistDialog = ref(false);
</script>
    
<template>
    <ModalDialog v-if="isAddPlaylistDialog">
        <h2>title your playlist</h2>
        <input type="text" placeholder="avid fortnite enjoyers">
        <div class="actions">
            <button class="button solid" @click="isAddPlaylistDialog = false;">
                <i class="icon-left fa-solid fa-plus-circle"></i>
                <b>to new adventures!</b>
            </button>
            <button class="button solid" style="--accent: var(--gray);" @click="isAddPlaylistDialog = false;">
                meh maybe later
            </button>
        </div>
    </ModalDialog>
    <nav>
        <div class="nav-item">
            <h2 style="color: var(--main)">
                <i class="fa-solid fa-headphones-simple"></i>
                songify
            </h2>
        </div>
        <NuxtLink class="nav-item clickable" to="/" style="margin-right: 0.75rem;">
            <i class="icon-left fa-solid fa-magnifying-glass"></i>
            <b>search</b>
        </NuxtLink>

        <div class="spacer">
            <hr>
        </div>

        <button class="nav-item clickable" style="margin-right: 0.75rem;" @click="isAddPlaylistDialog = true;">
            <i class="icon-left fa-solid fa-plus"></i>
            <b>new playlist</b>
        </button>

        <div class="playlist-selection">
            <NuxtLink v-for="i in 50" class="nav-item clickable" to="/playlists/678765">
                sauce
            </NuxtLink>
        </div>
    </nav>
</template>
    
    <style scoped>
    nav,
    .playlist-selection {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background: var(--dark-accent);
    }
    
    .playlist-selection {
        overflow-y: scroll;
    }
    
    .nav-item {
        background: transparent;
        text-align: left;
        padding: 1rem 4rem 1rem 2rem;
        text-decoration: none;
    }
    
    .nav-item.clickable:hover,
    .nav-item.clickable:active,
    .nav-item.nav-item.clickable.is-active {
        background: var(--dark);
    }
    
    .spacer {
        padding: 0.5rem 2rem;
    }
    </style>