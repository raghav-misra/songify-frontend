import { Howler, Howl } from "howler";

export const queue = ref<ISongData[]>([]);
const lastPlayed = ref<ISongData[]>([]);

let audioInstance: Howl | null = null;

//@ts-ignore
window.__audioInstance = () => audioInstance;

function createAudioInstance(src: string) {
    let tempInstance = new Howl({
        src,
        html5: true,
    });

    tempInstance.on("end", () => {
        if (player.looping) {
            audioInstance?.pos(0);
            audioInstance?.play();
        } else {
            moveNext();
        }
    })

    tempInstance.on("play", () => {
        player.playing = true;
        player.paused = false;
    });

    tempInstance.on("pause", () => {
        player.paused = true;
    });

    return tempInstance;
}

export const player = reactive({
    song: null as ISongData | null,
    playing: false,
    paused: false,
    looping: false,
    currentPosition: 0,
    length: 0,
    volume: 100
});

//@ts-ignore
window.__player = () => player;

watchEffect(() => {
    const formattedVolume = player.volume;
    if (audioInstance) {
        audioInstance.volume(formattedVolume / 100);
    }
});

const updatePosition = () => { player.currentPosition = audioInstance?.seek() || 0; };
let updatePositionInterval = -1;

async function playNow(song: ISongData) {
    window.clearInterval(updatePositionInterval);

    if (audioInstance && player.song?.id === song.id) {
        audioInstance.seek(0);
        updatePositionInterval = window.setInterval(updatePosition, 100);
    } else {
        const env = useRuntimeConfig();

        let nextAudioInstance = createAudioInstance(`${env.public.apiEndpoint}/stream/${song.id}`);

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

        const vol = player.volume / 100;

        (async function crossfadedLoop(enteringInstance: Howl, leavingInstance: Howl | null) {
            // Fade in entering instance
            enteringInstance.pos(0);
            enteringInstance.play();
            enteringInstance.fade(0, vol, 2000);
            leavingInstance?.fade(vol, 0, 2000);
            audioInstance = enteringInstance;
            updatePositionInterval = window.setInterval(updatePosition, 100);
            await wait(5000);
            leavingInstance?.unload();
        }) (nextAudioInstance, audioInstance);
    }
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
    if (audioInstance && lastPlayed.value.length === 0 && player.song) {
        audioInstance.seek(0);
        return;
    }

    if (lastPlayed.value.length === 0) return;
    // if there is previous
    if (audioInstance && player.song && audioInstance.seek() > 3) {
        audioInstance.seek(0);
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
    if (!audioInstance) return;

    if (player.paused) {
        audioInstance.play();
    } else if (player.playing) {
        audioInstance.pause();
    }
}


export const queueManager = { playNow, playNext, movePrevious, moveNext, addToQueue, togglePlay };