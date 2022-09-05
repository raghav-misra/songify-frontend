const queue = ref<ISongData[]>([]);
const lastPlayed = ref<ISongData[]>([]);

const audioInstance = new Audio();

export const player = reactive({
    song: null as ISongData | null,
    state: "empty" as "empty" | "paused" | "playing",
    currentPosition: 0,
});

export async function playImmediately(song: ISongData) {
    audioInstance.pause();
    const env = useRuntimeConfig();
    audioInstance.src = `${env.public.apiEndpoint}/stream/${song.id}`;
    await audioInstance.play();
    player.song = song;
}

export function moveToNextSong() {
    if (player.song) {
        lastPlayed.value.push(player.song);
        
        if (queue.value.length === 0) {
            queue.value = [...lastPlayed.value];
        }

        player.currentPosition = 0;
        playImmediately(queue.value.shift() as ISongData);
    }
}

audioInstance.addEventListener("ended", moveToNextSong);