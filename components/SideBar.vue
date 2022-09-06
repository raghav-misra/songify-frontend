<script setup lang="ts">
const isAddPlaylistDialogOpen = ref(false);
const playlistName = ref("");
const router = useRouter();

async function createPlaylist() {
    const createPlaylistResult = await api("POST")<{
        success: boolean;
        playlist: ICondensedPlaylist;
    }>(`/playlists`, {
        name: playlistName.value
    });

    if (createPlaylistResult.success) {
        playlists.value.push(createPlaylistResult.playlist);
        isAddPlaylistDialogOpen.value = false;
        router.push(`/playlists/${createPlaylistResult.playlist.playlistId}`);
    }
}
</script>
    
<template>
    <Transition name="page">
        <ModalDialog v-if="isAddPlaylistDialogOpen" tag="form" @submit.prevent="createPlaylist">
            <h2>title your playlist</h2>
            <input v-model.trim="playlistName" type="text" placeholder="avid fortnite enjoyers" required>
            <div class="actions">
                <button class="button solid">
                    <span class="icon-left material-icons-round">
                        next_week
                    </span>
                    <b>to new adventures!</b>
                </button>
                <button type="button" class="button solid" style="--accent: var(--gray);"
                    @click="isAddPlaylistDialogOpen = false;">
                    <span class="icon-left material-icons-round">
                        sentiment_very_dissatisfied
                    </span>
                    meh maybe later
                </button>
            </div>
        </ModalDialog>
    </Transition>
    <nav>
        <div class="nav-item" style="color: var(--main)">
            <h2>
                <span class="material-icons-round icon-left">
                    earbuds
                </span>
            </h2>
            <h2>
                <b>songify</b>
            </h2>
        </div>

        <NavLink to="/" style="margin-right: 0.75rem;">
            <span class="material-icons-round icon-left">
                manage_search
            </span>
            <b>search</b>
        </NavLink>

        <button class="nav-item clickable" style="margin-right: 0.75rem;" @click="isAddPlaylistDialogOpen = true;">
            <span class="material-icons-round icon-left">
                playlist_add
            </span>
            <b>new playlist</b>
        </button>

        <div class="playlist-selection">
            <NavLink v-for="playlist in playlists" class="nav-item clickable" :to="`/playlists/${playlist.playlistId}`">
                {{ playlist.name }}
            </NavLink>
        </div>
    </nav>
</template>
    
<style scoped>
nav {
    width: 15rem;
}

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
</style>