export const queue = ref<ISongData[]>([]);
const lastPlayed = ref<ISongData[]>([]);

const audioInstance = new Audio();
audioInstance.canPlayType = (type) => { console.log(type); return "probably"; };


export const player = reactive({
    song: null as ISongData | null,
    playing: false,
    paused: false,
    looping: false,
    currentPosition: 0,
    length: 0,
    volume: 100
});

watchEffect(() => {
    audioInstance.volume = player.volume / 100;
})

const updatePosition = () => { player.currentPosition = audioInstance.currentTime; };
let updatePositionInterval = -1;

async function playNow(song: ISongData) {
    if (!audioInstance.parentNode) {
        document.body.appendChild(audioInstance);
    }

    if (player.song?.id === song.id) {
        audioInstance.currentTime = 0;
    } else {
        audioInstance.pause();

        const env = useRuntimeConfig();

        const songRes = await fetch(`${env.public.apiEndpoint}/stream/${song.id}`);
        audioInstance.src = URL.createObjectURL(await songRes.blob());

        // audioInstance.src = `${env.public.apiEndpoint}/stream/${song.id}`;
        player.song = song;

        if ("mediaSession" in navigator) {
            navigator.mediaSession.setActionHandler("play", () => togglePlay());
            navigator.mediaSession.setActionHandler("pause", () => togglePlay());
            navigator.mediaSession.setActionHandler("nexttrack", () => moveNext());
            navigator.mediaSession.setActionHandler("previoustrack", () => movePrevious());

            navigator.mediaSession.metadata = new MediaMetadata({
                title: player.song.title,
                artist: player.song.artist,
                album: "songify",
                artwork: [
                    { src: player.song.thumbnail }
                ]
            });
        }
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

function movePrevious() {
    // if no previous, just restart
    if (lastPlayed.value.length === 0 && player.song) {
        audioInstance.currentTime = 0;
        return;
    }

    if (lastPlayed.value.length === 0) return;
    // if there is previous
    if (player.song && audioInstance.currentTime > 3) {
        audioInstance.currentTime = 0;
        return;
    }

    if (player.song) {
        queue.value.unshift(player.song);
        playNow(lastPlayed.value.pop() as ISongData);
    }
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


export const queueManager = { playNow, playNext, movePrevious, moveNext, addToQueue, togglePlay };