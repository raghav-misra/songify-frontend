<script setup lang="ts">
const isLoggedIn = useLoginState();
</script>

<template>
    <div id="root">
        <template v-if="isLoggedIn">
            <main>
                <SideBar />
                <NuxtPage />
            </main>
            <ControlBar />
        </template>

        <ModalDialog v-else tag="form">
            <h1><b>looks like someones not logged in!</b></h1>
            <p>lets fix that, shall we?</p>

            <div>
                <input type="checkbox" class="icon-left">
                <b>new account</b>
            </div>

            <div>
                <p><b>username</b></p>
                <input type="text" placeholder="noobmaster69">
            </div>

            <div>
                <p><b>password</b></p>
                <input type="password" placeholder="?!?!??!?!!?@?">
            </div>

            <div class="actions">
                <button class="button solid">
                    <i class="icon-left fa-solid fa-thumbs-up"></i>
                    <b>dababy lets go</b>
                </button>
                <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="button solid"
                    style="--accent: var(--gray);">
                    <i class="icon-left fa-solid fa-trash"></i>
                    <span>i have no friends</span>
                </a>
            </div>
        </ModalDialog>
    </div>
</template>

<style>
html,
body {
    background: var(--dark);
}

#root {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: hidden;

    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
    display: flex;
    align-items: stretch;
    overflow-y: hidden;
}
</style>