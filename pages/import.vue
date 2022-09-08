<script setup lang="ts">
const token = ref<string | null>(null);
const censoredifyPlaylistChoices = ref<ICENSOREDifyPlaylistResponse[]>([]);
const selectedPlaylist = ref<string | null>(null);
const router = useRouter();
const isLoading = ref(false);

onMounted(async () => {
    const payload = new URLSearchParams({
        grant_type: "authorization_code",
        redirect_uri: `${location.protocol}//${location.host}/import`,
        code: new URLSearchParams(location.search).get("code") as string,
    });

    const config = useRuntimeConfig();

    const tokenRequest = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: payload.toString(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${window.btoa(`${config.public.censoredifyClientId}:${config.public.censoredifyClientSecret}`)}`
        }
    });

    let data = await tokenRequest.json();

    if (data.error) {
        console.log(data.error);
    }

    token.value = data.access_token;

    const playlistsResponse = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.value}`
        }
    });

    const { items } = await playlistsResponse.json();

    if (!items) return;

    censoredifyPlaylistChoices.value = items;
});

async function getTracks(href: string, headers: Record<string, string>): Promise<ISongData[]> {
    const tracksResponse: ICENSOREDifyTracksResponse = await (await fetch(href, { headers })).json();
    console.log(tracksResponse);
    
    if (!tracksResponse?.items) {
        return [];
    }

    console.log(tracksResponse.next);

    const items = tracksResponse.items;
    console.log(items[0]);

    const fetchedTracks = await Promise.allSettled<ISongData | null>(items.map(async ({ track }) => {
        const artists = track.artists.map(a => a.name);

        const searchResponse = await api("GET")<{
            success: boolean;
            songs: ISongData[];
        }>(`/search/${encodeURIComponent(`${artists.join(" ")} ${track.name}`)}`);

        if (!searchResponse.success || !searchResponse.songs[0]) return null;

        return {
            title: track.name,
            artist: artists.join(", "),
            id: searchResponse.songs[0].id,
            thumbnail: track.album.images[0].url
        };
    }));

    const tracks: ISongData[] = fetchedTracks
        //@ts-ignore
        .filter<PromiseSettledResult<ISongData>>(t => t.status === "fulfilled" && t.value !== null)
        //@ts-ignore
        .map(t => t.value);

    return typeof tracksResponse.next === "string" ?
        tracks.concat(await getTracks(tracksResponse.next, headers)) :
        tracks;
}

async function importPlaylist() {
    if (!selectedPlaylist.value) return;

    isLoading.value = true;

    const songs = await getTracks(`${selectedPlaylist.value}/tracks?offset=0&limit=100&locale=en-US,en`, {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.value}`
    });

    const createPlaylistResult = await api("POST")<{
        success: boolean;
        playlist: ICondensedPlaylist;
    }>(`/playlists`, {
        name: censoredifyPlaylistChoices.value.find(p => p.href === selectedPlaylist.value)?.name,
        songs
    });

    if (createPlaylistResult.success) {
        playlists.value.push(createPlaylistResult.playlist);
        router.push(`/playlists/${createPlaylistResult.playlist.playlistId}`);
    }

    isLoading.value = false;
}
</script>

<template>
    <AppView>
        <form @submit.prevent="importPlaylist" class="container">
            <h2>import a playlist</h2>

            <p>connected to censoredify: <b>{{ token !== null }}</b></p>
            <p>loaded playlists: <b>{{ censoredifyPlaylistChoices.length > 0 }}</b></p>


            <p v-if="isLoading">
                loading! be patient we're pulling ur songs...
            </p>
            <template v-else-if="censoredifyPlaylistChoices.length > 0">
                <p>
                    select a playlist:
                    <select v-model="selectedPlaylist" required>
                        <option v-for="playlist in censoredifyPlaylistChoices" :value="playlist.href">
                            {{ playlist.name }}
                        </option>
                    </select>
                </p>

                <button type="submit" class="button solid">import!</button>
            </template>
        </form>
    </AppView>
</template>