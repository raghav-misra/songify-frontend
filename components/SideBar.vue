<template>
    <nav>
        <div class="nav-item">
            <h2>LOGO HERE</h2>
        </div>
        <NuxtLink class="nav-item clickable" to="/">
            <b>NOW PLAYING</b>
        </NuxtLink>
        <NuxtLink class="nav-item clickable" to="/search">
            <b>SEARCH</b>
        </NuxtLink>

        <div class="spacer"><hr></div>

        <NuxtLink class="nav-item clickable" to="/search">
            <b>NEW PLAYLIST</b>
        </NuxtLink>

        <NuxtLink v-for="i in 50" class="nav-item clickable" to="/playlists/678765">
            sauce
        </NuxtLink>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: var(--dark-accent);
    overflow-y: scroll;
}

.nav-item {
    background: transparent;
    text-align: left;
    padding: 1rem 4rem 1rem 2rem;
    text-decoration: none;
}

.nav-item.clickable:hover,
.nav-item.clickable:active {
    background: var(--dark);
}

.spacer {
    padding: 0.5rem 2rem;
}

hr {
    height: 0;
    border: none;
    border-top: 1px white solid;
}
</style>