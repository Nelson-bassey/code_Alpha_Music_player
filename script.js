let songName = document.querySelector("#song-name");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-image");
let playPauseImg = document.querySelector("#play-pause");
let volumeRange = document.querySelector("#volume-range");
let songRange = document.querySelector("#song-duration");
let volSvg = document.querySelector("#vol-svg");
let musicanim = document.querySelector("#musicanim");
let playlistImg = document.querySelector("#playlist-img");
let playlist = document.querySelector(".playlist");
let playlistSong = document.querySelectorAll(".playlist-song");
let index = 0;
let playingSong = false;
let track = document.createElement("audio")
let songs = [
    {
        name: "Purple Valentine",
        path: "assets/secondSong.mp3",
        image: "assets/ejiyk.jpeg",
        singer: "Ejiyk",
    },
    {
        name: "With You",
        path: "assets/With You.mp3",
        image: "assets/omah lay.jpeg",
        singer: "Omah Lay ft Davido",
    },
    {
        name: "Love",
        path: "assets/love.mp3",
        image: "assets/burna.jpeg",
        singer: "Burna Boy",
    },
    {
        name: "Like I Want You",
        path: "assets/firstSong.mp3",
        image: "assets/paddy.jfif",
        singer: "Bruno Mars",
    },
    {
        name: "Love Mashup",
        path: "assets/love mashup.mp3",
        image: "assets/yea.jpg",
        singer: "Sickved",
    },
    {
        name: "Sad Love Song",
        path: "assets/sad love.mp3",
        image: "assets/phone2.jpg",
        singer: "NiExshadow",
    },
    {
        name: "Sad Mashup",
        path: "assets/lofi.mp3",
        image: "assets/car 9.jpg",
        singer: "Lofi",
    }
]
function loadTrack(index) {
    track.src = songs[index].path;
    songName.innerHTML = songs[index].name;
    songSinger.innerHTML = songs[index].singer;
    songImage.style = `background-image: url("${songs[index].image}");`
    volume()
    // this interval enables the range to move while the music plays.
    setInterval(() => {
        songRange.max = track.duration
        songRange.value = track.currentTime
    }, 1000)

    track.onended = ()=>{
        nextSong();
    }
}

loadTrack(index);


function playPause() {
    if (track.paused) {
        track.play();
        playPauseImg.src = "pause.svg"
        musicanim.style.display = "block"

    } else {
        track.pause();
        playPauseImg.src = "play.svg"
        musicanim.style.display = "none"
    }
}
// the function that triggers play
function playSong() {
    track.play();
    playingSong = true;
    playPauseImg.src = "pause.svg"
    musicanim.style.display="block"
}

// the function that triggers pause 
function pauseSong() {
    track.pause();
    playingSong = false;
    playPauseImg.src = "play.svg"
}
//  function that triggers next
function nextSong() {
    if (index < songs.length - 1) {
        index++;
        loadTrack(index)
        playSong()
    } else {
        index = 0;
        loadTrack(index)
        playSong()
    }
}

// function that triggers previous
function previousSong() {
    if (index > 0) {
        index--;
        loadTrack(index)
        playSong()
    } else {
        index = songs.length - 1;
        loadTrack(index);
        playSong()
    }
}

// this function enable the volume range to be high or low depending on hoew the user  does it
function volume() {
    track.volume = volumeRange.value / 100
    if (volumeRange.value == 0) {
        volSvg.src = "mute.svg"
    } else {
        volSvg.src = "volume.svg"
    }
}

function duration() {
    track.currentTime = songRange.value
}
playlistImg.addEventListener("click", () => {
    playlist.classList.toggle("playlist-active")
    if (playlist.classList.contains("playlist-active")) {
        playlistImg.src = "cross.svg"
    } else {
        playlistImg.src = "playlist.svg"
    }
})
playlistSong.forEach((song, index) => {
    song.addEventListener("click", () => {
        loadTrack(index);
        playSong()
        playlist.classList.remove("playlist-active")
        playlistImg.src = "playlist.svg"
    })
})