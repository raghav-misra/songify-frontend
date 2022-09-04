<script setup lang="ts">
const isLoggedIn = useLoginState();

const userState = useUserState();

const authData = reactive({
    isSignup: true,
    username: "",
    password: ""
});

const formMessage = reactive({
    prefix: null,
    message: null,
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
        delete response.success;
        userState.value = response;
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
            <input v-model="authData.isSignup" type="checkbox" class="icon-left">
            <b>new account?</b>
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
            <button class="button solid" type="submit">
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
</template>