<script setup lang="ts">
const isAddPlaylistDialogOpen = ref(false);
</script>
    
<template>
    <ModalDialog v-if="isAddPlaylistDialogOpen">
        <h2>title your playlist</h2>
        <input type="text" placeholder="avid fortnite enjoyers">
        <div class="actions">
            <button class="button solid" @click="isAddPlaylistDialogOpen = false;">
                <i class="icon-left fa-solid fa-plus-circle"></i>
                <b>to new adventures!</b>
            </button>
            <button class="button solid" style="--accent: var(--gray);" @click="isAddPlaylistDialogOpen = false;">
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
        
        <NavLink to="/" style="margin-right: 0.75rem;">
            <i class="icon-left fa-solid fa-magnifying-glass"></i>
            <b>search</b>    
        </NavLink>

        <button class="nav-item clickable" style="margin-right: 0.75rem;" @click="isAddPlaylistDialogOpen = true;">
            <i class="icon-left fa-solid fa-plus"></i>
            <b>new playlist</b>
        </button>

        <div class="playlist-selection">
            <NavLink v-for="i in 50" class="nav-item clickable" :to="`/playlists/${i}`">
                sauce
            </NavLink>
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
</style>