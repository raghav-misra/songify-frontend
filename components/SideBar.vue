<script setup lang="ts">
const isAddPlaylistDialogOpen = ref(false);
const playlistName = ref("");
const router = useRouter();

const isMobileModalShowing = ref(false);

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

    <button class="button solid is-mobile menu-button" @click="isMobileModalShowing = true;">menu</button>

    <nav :class="[isMobileModalShowing && 'is-showing']">
        <div style="height: 1rem;"></div>
        <div class="nav-item" style="color: var(--main)">
            <h2>
                <span class="material-icons-round icon-left">
                    earbuds
                </span>
            </h2>
            <h2>
                <b>songify</b>
            </h2>

            <button class="button icon is-mobile" style="margin-left: auto; color: var(--gray);">
                <span class="material-icons-round" @click="isMobileModalShowing = false;">
                    close
                </span>
            </button>
        </div>

        <NavLink to="/" style="margin-right: 0.75rem;" @click="isMobileModalShowing = false;">
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
            <NavLink v-for="playlist in playlists" :key="playlist.playlistId" class="nav-item clickable"
                :to="`/playlists/${playlist.playlistId}`" @click="isMobileModalShowing = false;">
                {{ playlist.name }}
            </NavLink>
        </div>
    </nav>
</template>
    
<style scoped>
nav {
    width: 15rem;
    z-index: 2;
    transition: opacity 0.5s ease-in-out;
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

.menu-button {
    position: fixed;
    z-index: 1;
    top: 2rem;
    right: 2rem;
}

@media screen and (max-width: 768px) {
    nav {
        border: 1px var(--gray) solid;
        flex: 1;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        display: none;
    }

    nav.is-showing {
        display: flex;
        opacity: 1;
    }
}
</style>