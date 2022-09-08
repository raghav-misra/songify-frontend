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

interface IPlaylist {
    _id: string;
    name: string;
    username: string;
    userId: string;
    songs: ISongData[];
}

interface ICondensedPlaylist {
    name: string;
    userId: string;
    playlistId: string;
}

interface ICENSOREDifyTracksResponse {
    items?: ({
        track: {
            name: string;
            artists: ({
                name: string;
            })[];
            album: {
                images: ({
                    url: string;
                })[];
            };
        }
    })[];
    next?: string;
}

interface ICENSOREDifyPlaylistResponse {
    name: string;
    href: string;
    tracks?: ICENSOREDifyTracksResponse[];
    next?: string;
}