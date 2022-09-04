export const userState = reactive<IUserState>({
    token: null,
    user: {
        _id: null,
        username: null,
    },
});

export const isLoggedIn = computed(() =>
    typeof userState.token === "string" &&
    typeof userState.user.username === "string"
);