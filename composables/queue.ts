import { Howl, Howler } from "howler";

export const queue = ref<ISongData[]>([]);
const lastPlayed = ref<ISongData[]>([]);

// const audioInstance = new Audio();
let audioHowler: Howl | null = null;

//@ts-ignore
window.ah = Howl;

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
    // audioInstance.volume = player.volume / 100;
    audioHowler?.volume(player.volume / 100);
})

const updatePosition = () => { player.currentPosition = audioHowler?.seek() || 0; };
let updatePositionInterval = -1;

function playNow(song: ISongData) {
    audioHowler?.pause();
    clearInterval(updatePositionInterval);

    if (player.song?.id === song.id) {
        audioHowler?.seek(0);
    } else {
        const env = useRuntimeConfig();
        audioHowler = new Howl({
            src: [`${env.public.apiEndpoint}/stream/${song.id}`],
            html5: true
        });

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

    audioHowler?.on("play", () => {
        player.playing = true;
        player.paused = false;
    });

    audioHowler?.on("pause", () => {
        player.paused = true;
    });

    audioHowler?.play();
    player.length = audioHowler?.duration() || 0;
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
        audioHowler?.seek(0);
        return;
    }

    if (lastPlayed.value.length === 0) return;
    // if there is previous
    if (player.song && (audioHowler?.seek() || 0) > 3) {
        audioHowler?.seek(0);
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
        audioHowler?.play();
    } else if (player.playing) {
        audioHowler?.pause();
    }
}

watchEffect(() => {
    audioHowler?.loop(player.looping);
});

// audioInstance.addEventListener("ended", () => {
//     if (player.looping) {
//         audioInstance.currentTime = 0;
//         audioInstance.play();
//     } else {
//         moveNext();
//     }
// });


export const queueManager = { playNow, playNext, movePrevious, moveNext, addToQueue, togglePlay };