interface IUserState {
    token: string | null;
    user: {
        _id: string | null;
        username: string | null;
    };
}

interface ISongData {
    id: string;
    title: string;
    artist: string;
    thumbnail: string;
}