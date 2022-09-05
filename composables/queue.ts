export const queue = ref<ISongData[]>([]);
const lastPlayed = ref<ISongData[]>([]);

const audioInstance = new Audio();

//@ts-ignore
window.a = audioInstance;

export const player = reactive({
    song: null as ISongData | null,
    state: "empty" as "empty" | "paused" | "playing",
    currentPosition: 0,
    length: 0,
});

const updatePosition = () => { player.currentPosition = audioInstance.currentTime; };
let updatePositionInterval = -1;

async function playNow(song: ISongData) {
    audioInstance.pause();
    const env = useRuntimeConfig();
    audioInstance.src = `${env.public.apiEndpoint}/stream/${song.id}`;
    await audioInstance.play();
    player.song = song;
    player.length = audioInstance.duration;
    updatePositionInterval = window.setInterval(updatePosition, 100);
}

function playNext(song: ISongData) {
    queue.value.unshift(song);
}

function moveNext() {
    if (player.song) {
        lastPlayed.value.push(player.song);
        
        if (queue.value.length === 0) {
            queue.value = [...lastPlayed.value];
            lastPlayed.value = [];
        }

        player.currentPosition = 0;
        player.length = 0;
        playNow(queue.value.shift() as ISongData);
    }
}

function addToQueue(...songs: ISongData[]) {
    queue.value.push(...songs);
}

audioInstance.addEventListener("ended", moveNext);

export const queueManager = { playNow, playNext, moveNext, addToQueue };