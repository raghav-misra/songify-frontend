interface IUserState {
    token: string | null;
    user: {
        _id: string | null;
        username: string | null;
    };
}

export const useUserState = () => useState<IUserState>("user", () => ({
    token: null,
    user: {
        _id: null,
        username: null
    }
}));

export const useLoginState = () => {
    const userState = useUserState();
    return computed(() =>
        typeof userState.value.token === "string" &&
        typeof userState.value.user.username === "string"
    );
};