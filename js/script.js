let {songs} = {
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
            "id": 4},
        {
            "name": "Phir Se Ud Chala",
            "artist": "Mohit Chauhan",
            "location": "./assets/Phir Se Ud Chala.mp3",
            "image": "./images/Rockstar.jpeg",
            "liked": true,
            "id": 5},
        {
            "name": "Pallivaalu-Bhadravattakam",
            "artist": "Vidya Vox",
            "location": "./assets/Pallivaalu-Bhadravattakam.mp3",
            "image": "./images/vidya vox.jpeg",
            "liked": true,
            "id": 6},
        {
            "name": "Be Free",
            "artist": "Vidya Vox",
            "location": "./assets/Be Free.mp3",
            "image": "./images/vidya vox.jpeg",
            "liked": true,
            "id": 7},
        {
            "name": "Sound of Salaar",
            "artist": "Ravi Basrur",
            "location": "./assets/Sound of Salaar.mp3",
            "image": "./images/Salaar.jpeg",
            "liked": false,
            "id": 8},
        {
            "name": "Sooreede",
            "artist": "Harini Ivaturi",
            "location": "./assets/Sooreede.mp3",
            "image": "./images/Salaar.jpeg",
            "liked": true,
            "id": 9},
        {
            "name": "Neeve",
            "artist": "G.V Prakash",
            "location": "./assets/Neeve.mp3",
            "image": "./images/darling.jpeg",
            "liked": true,
            "id": 10},
        {
            "name": "Badulu Thochani",
            "artist": "Karthik",
            "location": "./assets/Badulu Thochani.mp3",
            "image": "./images/mr.perfect.jpeg",
            "liked": false,
            "id": 11}
    ]
};
  

if(!localStorage.getItem("songs")){
    localStorage.setItem("songs", JSON.stringify(songs))
} else {
    songs = JSON.parse(localStorage.getItem("songs"));
}

const updateStorage = () => {
    localStorage.setItem("songs", JSON.stringify(songs))
}

// Getting required elemets, const to not allow reinitialization
// let for reinitialization of that elements to update from DOM.
const playerHead = document.getElementById("player");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let cardCollection = document.querySelectorAll(".card__collection_main");
let currentSong = new Audio();

//Player is hidden by default and is visible only when a song is clicked.
playerHead.style.display = "none";

//Function to create card and add functionality to update player head.
const createCard = (song) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const cardInfo = document.createElement("div");
    const cardName = document.createElement("p");
    const cardArtist = document.createElement("p");

    //Assigning Classes to the elements created.
    card.className = "card";
    cardInfo.className = "card_info";
    cardName.className = "card_name";
    cardArtist.className = "card_artist";

    //Adding the song details to the card.
    cardName.innerHTML = song.name;
    cardArtist.innerHTML = song.artist;
    img.src = song.image;
    img.alt = song.name;

    //Structuring the card
    cardInfo.append(cardName, cardArtist);
    card.append(img, cardInfo);

    //Adding functionality to the card to update the player head on click
    card.onclick = function(){
        playerHead.style.display = "flex";
        currentSong = updatePlayer(song);
        playPauseFunc(currentSong);
    }

    //Return the dynamic card element.
    return card;
}

//Adds functionality to the play and pause buttons to play the current song.
const playPauseFunc = (song) => {
    //Reinitialize the buttons.
    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");
    
    //When the play button is clicked, the song is played.
    playBtn.addEventListener("click", () => {
        song.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    });
    
    //When the pause button is clicked, the song is paused.
    pauseBtn.addEventListener("click", () => {
        song.pause();
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
    });
}

//Like and unlike the song and update the card collection for liked songs.
const likeSong = (id, likeBtn, songName) => {

    //Reinitialize the collection to get the updated collection from DOM.
    cardCollection = document.querySelectorAll(".card__collection_main");
    //Get the current liked songs from the above collection.
    let likedSongs = cardCollection[0].children;
    //Since it returns a HTMLCollection, array functions can not be performed
    //The likedSongs is converted into an array using the Array object
    //converting it to an actual array using Array.from()l
    likedSongs = Array.from(likedSongs);

    //Check if the global song object is liked or not
    //if liked before, then unlike it, change color of like button
    //and remove that song from the liked songs collection.
    if(songs[id].liked){
        songs[id].liked = false;
        likeBtn.style.color = "grey";
        likedSongs.forEach(songCard => {
            const name = songCard.lastChild.firstChild.innerHTML;
            if(name == songName){
                songCard.style.display = "none";
                songCard.remove();
            }
        });
    //If song is not liked, then like the song,
    //change the color of like button
    //and add that song in the liked song collection.
    } else {
        songs[id].liked = true;
        likeBtn.style.color = "red";
        cardCollection[0].append(createCard(songs[id]));
    }
    updateStorage();
}

//update the player head whenever a new song is clicked. 
const updatePlayer = ({name, artist, location, image, liked, id}) => {
    //The arugument of the function is a song object
    //We are destructuing it in the arguments directly and using it.

    //Setting the new song for the global song object.
    currentSong.setAttribute("src", location);

    //Getting the required elements from the player head.
    const songContainer = document.querySelector(".song");
    const artistContainer = document.querySelector(".artist");
    const likeBtn = document.querySelector(".likeBtn");
    const artistImage = document.querySelector(".artist_image");
    const endTime = document.getElementById("end_time");

    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    //Setting the default to the player head pause and play buttons.
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
    
    //Adding the selected song details in the player head.
    songContainer.innerHTML = name;
    artistContainer.innerHTML = artist;
    artistImage.src = image;
    
    //Assign the id of the song to the button,
    //Check is song is liked and add the color based on song.liked.
    likeBtn.id = id;
    likeBtn.style.color = "grey";
    if(liked){
        likeBtn.style.color = "red";
    }

    //Adding a onclick functionlity to the like button.
    likeBtn.onclick = function () {
        likeSong(likeBtn.id, likeBtn, name);
    }   

    //When the current song is loaded, set it's duration and add it 
    //to the end time element.
    currentSong.onloadedmetadata = () => {
        let duration = currentSong.duration;
        duration = (duration/60).toPrecision(3) + "";
        endTime.innerHTML = duration;
    }

    //Return the current song 
    return currentSong;
}

//main function that calls all other functions.
//updates the collection by creating the cards and adding them.
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


//Once the document if fully loaded, call the update collection function
//and add the functionlity to the Spotify Clone.
document.addEventListener("DOMContentLoaded", async() => {
    updateCollection();
})
