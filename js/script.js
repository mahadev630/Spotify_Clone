let { songs } = {
    "songs": [
        {
            "name": "Gira Gira Gira",
            "artist": "Gowtham Bharadwaj",
            "location": "./assets/Gira Gira Gira.mp3",
            "image": "./images/dear_comrade.jpeg",
            "liked": true,
            "id": 0
        },
        {
            "name": "Urugi Urugi",
            "artist": "Anand",
            "location": "./assets/Urugi Urugi.mp3",
            "image": "./images/joe.jpeg",
            "liked": true,
            "id": 1
        },
        {
            "name": "Bommanu Geesthey",
            "artist": "Gopika Poornima",
            "location": "./assets/Bommanu Geesthey.mp3",
            "image": "./images/bommarilu.jpeg",
            "liked": false,
            "id": 2
        },
        {
            "name": "Chiru Chiru",
            "artist": "Hari Charan",
            "location": "./assets/Chiru Chiru.mp3",
            "image": "./images/awara.jpeg",
            "liked": false,
            "id": 3
        },
        {
            "name": "Nenu Nuvvantu",
            "artist": "Naresh Iyer",
            "location": "./assets/Nenu Nuvvantu.mp3",
            "image": "./images/Orange.jpeg",
            "liked": false,
            "id": 4
        },
        {
            "name": "Phir Se Ud Chala",
            "artist": "Mohit Chauhan",
            "location": "./assets/Phir Se Ud Chala.mp3",
            "image": "./images/Rockstar.jpeg",
            "liked": true,
            "id": 5
        },
        {
            "name": "Pallivaalu-Bhadravattakam",
            "artist": "Vidya Vox",
            "location": "./assets/Pallivaalu-Bhadravattakam.mp3",
            "image": "./images/vidya_vox.jpeg",
            "liked": true,
            "id": 6
        },
        {
            "name": "Sound of Salaar",
            "artist": "Ravi Basrur",
            "location": "./assets/Sound of Salaar.mp3",
            "image": "./images/Sooreede_cover.jpeg",
            "liked": false,
            "id": 7
        },
        {
            "name": "Be Free",
            "artist": "Vidya Vox",
            "location": "./assets/Be Free.mp3",
            "image": "./images/vidya vox.jpeg",
            "liked": true,
            "id": 8
        },
        {
            "name": "Sooreede",
            "artist": "Harini Ivaturi",
            "location": "./assets/Sooreede.mp3",
            "image": "./images/Sooreede_cover.jpeg",
            "liked": true,
            "id": 9
        },
        {
            "name": "Neeve",
            "artist": "G.V Prakash",
            "location": "./assets/Neeve.mp3",
            "image": "./images/darling.jpeg",
            "liked": true,
            "id": 10
        },
        {
            "name": "Badulu Thochani",
            "artist": "Karthik",
            "location": "./assets/Badulu Thochani.mp3",
            "image": "./images/mr.perfect.jpeg",
            "liked": false,
            "id": 11
        }
    ]
};


if (!localStorage.getItem("songs")) {
    localStorage.setItem("songs", JSON.stringify(songs))
} else {
    songs = JSON.parse(localStorage.getItem("songs"));
}

const updateStorage = () => {
    localStorage.setItem("songs", JSON.stringify(songs))
}

const playerHead = document.getElementById("player");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let cardCollection = document.querySelectorAll(".card__collection_main");
let currentSong = new Audio();

playerHead.style.display = "none";

const createCard = (song) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const cardInfo = document.createElement("div");
    const cardName = document.createElement("p");
    const cardArtist = document.createElement("p");

    card.className = "card";
    cardInfo.className = "card_info";
    cardName.className = "card_name";
    cardArtist.className = "card_artist";

    cardName.innerHTML = song.name;
    cardArtist.innerHTML = song.artist;
    img.src = song.image;
    img.alt = song.name;

    cardInfo.append(cardName, cardArtist);
    card.append(img, cardInfo);

    card.onclick = function () {
        playerHead.style.display = "flex";
        currentSong = updatePlayer(song);
        playPauseFunc(currentSong);
    }


    return card;
}

const playPauseFunc = (song) => {
    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    playBtn.addEventListener("click", () => {
        song.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    });

    pauseBtn.addEventListener("click", () => {
        song.pause();
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
    });
}

const likeSong = (id, likeBtn, songName) => {

    cardCollection = document.querySelectorAll(".card__collection_main");

    let likedSongs = cardCollection[0].children;

    likedSongs = Array.from(likedSongs);

    if (songs[id].liked) {
        songs[id].liked = false;
        likeBtn.style.color = "grey";
        likedSongs.forEach(songCard => {
            const name = songCard.lastChild.firstChild.innerHTML;
            if (name == songName) {
                songCard.style.display = "none";
                songCard.remove();
            }
        });
    } else {
        songs[id].liked = true;
        likeBtn.style.color = "red";
        cardCollection[0].append(createCard(songs[id]));
    }
    updateStorage();
}

const updatePlayer = ({ name, artist, location, image, liked, id }) => {

    currentSong.setAttribute("src", location);

    const songContainer = document.querySelector(".song");
    const artistContainer = document.querySelector(".artist");
    const likeBtn = document.querySelector(".likeBtn");
    const artistImage = document.querySelector(".artist_image");
    const endTime = document.getElementById("end_time");

    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";

    songContainer.innerHTML = name;
    artistContainer.innerHTML = artist;
    artistImage.src = image;

    likeBtn.id = id;
    likeBtn.style.color = "grey";
    if (liked) {
        likeBtn.style.color = "red";
    }

    likeBtn.onclick = function () {
        likeSong(likeBtn.id, likeBtn, name);
    }

    currentSong.onloadedmetadata = () => {
        let duration = currentSong.duration;
        duration = (duration / 60).toPrecision(3) + "";
        endTime.innerHTML = duration;
    }

    return currentSong;
}

const updateCollection = () => {
    cardCollection = document.querySelectorAll(".card__collection_main");

    cardCollection.forEach((collection, index) => {
        if (index === 0) {
            songs.forEach((song) => {
                if (song.liked) {
                    console.log("Liked song being added:", song);
                    collection.append(createCard(song));
                }
            });
        } else {
            songs.forEach((song) => {
                console.log("Adding song to collection:", song);
                collection.append(createCard(song));
            });
        }
        if (index % 2 !== 0) {
            collection.classList.toggle("reverse");
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    updateCollection();
})
