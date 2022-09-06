export const queue = ref<ISongData[]>([]);
const lastPlayed = ref<ISongData[]>([]);

const audioInstance = new Audio();

export const player = reactive({
    song: null as ISongData | null,
    playing: false,
    paused: false,
    looping: false,
    currentPosition: 0,
    length: 0,
});

const updatePosition = () => { player.currentPosition = audioInstance.currentTime; };
let updatePositionInterval = -1;

async function playNow(song: ISongData) {
    audioInstance.pause();

    if (player.song?.id === song.id) {
        audioInstance.currentTime = 0;
    } else {
        const env = useRuntimeConfig();
        audioInstance.src = `${env.public.apiEndpoint}/stream/${song.id}`;
        player.song = song;
    }

    await audioInstance.play();
    player.length = audioInstance.duration;
    updatePositionInterval = window.setInterval(updatePosition, 100);
}

function playNext(song: ISongData) {
    queue.value.unshift(song);
}

function moveNext() {
    if (player.song) {
        lastPlayed.value.push(player.song);
    }

    if (queue.value.length === 0) {
        queue.value = [...lastPlayed.value];
        lastPlayed.value = [];
    }

    player.currentPosition = 0;
    player.length = 0;
    playNow(queue.value.shift() as ISongData);
}

function addToQueue(...songs: ISongData[]) {
    queue.value.push(...songs);
}

function togglePlay() {
    if (player.paused) {
        audioInstance.play();
    } else if (player.playing) {
        audioInstance.pause();
    }
}

audioInstance.addEventListener("ended", () => {
    if (player.looping) {
        audioInstance.currentTime = 0;
        audioInstance.play();
    } else {
        moveNext();
    }
});
audioInstance.addEventListener("play", () => {
    player.playing = true;
    player.paused = false;
});
audioInstance.addEventListener("pause", () => {
    player.paused = true;
});

export const queueManager = { playNow, playNext, moveNext, addToQueue, togglePlay };