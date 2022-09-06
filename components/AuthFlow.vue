<script setup lang="ts">
const authData = reactive({
    isSignup: false,
    username: "",
    password: ""
});

const formMessage = reactive({
    prefix: null as string | null,
    message: null as string | null,
});

async function completeAuthentication() {
    if (authData.username.trim().length < 7 || authData.password.trim().length < 7) {
        formMessage.prefix = "error";
        formMessage.message = "username & password both need to be 7+ chars!";
        return;
    }

    formMessage.prefix = "hold up";
    formMessage.message = "loading...";

    const response = await api("POST")<{
        success: boolean;
        token: string;
        error: string;
        user: {
            _id: string;
            username: string;
        }
    }>(authData.isSignup ? "/auth/signup" : "/auth/login", {
        username: authData.username,
        password: authData.password
    });

    if (response.success) {
        userState.token = response.token;
        userState.user = response.user;

        const playlistResult = await api("GET")<{
            success: boolean;
            message: string;
            playlists: ICondensedPlaylist[]
        }>(`/playlists/user/${encodeURIComponent(userState.user._id as string)}`);

        if (playlistResult.success) {
            playlists.value.push(...playlistResult.playlists);
        }

        formMessage.prefix = "success";
        formMessage.message = "good job you made an account."
    } else {
        formMessage.prefix = "error";
        formMessage.message = response.error;
    }
}
</script>

<template>
    <ModalDialog tag="form" @submit.prevent="completeAuthentication" style="min-width: 70vw;">
        <h1><b>looks like someones not logged in!</b></h1>
        <p v-if="formMessage.message">
            <b style="color: var(--main);">{{ formMessage.prefix }}:</b>
            {{ formMessage.message }}
        </p>
        <p v-else>lets fix that, shall we?</p>

        <div>
            <button class="button link solid" type="button" @click="authData.isSignup = !authData.isSignup">
                <input class="icon-left" v-model="authData.isSignup" type="checkbox">
                <b>is this a new account?</b>
            </button>
        </div>

        <div>
            <p><b>username</b></p>
            <input v-model.trim="authData.username" required type="text" placeholder="noobmaster69">
        </div>

        <div>
            <p><b>password</b></p>
            <input v-model="authData.password" type="password" placeholder="?!?!??!?!!?@?">
        </div>

        <div class="actions">
            <button class="button solid" style="--accent: var(--alt);" type="submit">
                <span class="material-icons-round icon-left">
                    thumb_up
                </span>
                <b>dababy lets go</b>
            </button>
            <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="button solid"
                style="--accent: var(--gray);">
                <span class="icon-left material-icons-round">
                    delete
                </span>
                <span>i have no friends</span>
            </a>
        </div>
    </ModalDialog>
</template>