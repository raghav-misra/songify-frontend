export const useLoginState = () => useState("login", () => false);

interface IUserState {
    username: string | null;
    email: string | null;
    playlists: ({
        _id: string;
        name: string;
    })[];
}

export const useUserState = () => useState<IUserState>("user", () => ({
    username: null,
    email: null,
    playlists: [
        {
            _id: "34567uijhgf",
            name: "sauce"
        }
    ]
}));