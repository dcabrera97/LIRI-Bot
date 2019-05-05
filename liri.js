require("dotenv").config();

var axios = require("axios")
var fs = require("fs")
var keys = require("../LIRI-Bot/keys")
var moment = require('moment');
var divider = "\n------------------------------------------------------------\n\n";
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);


var search = process.argv[2]

var term = process.argv.slice(3).join(" ")

console.log(search)
console.log(term)

switch (search) {
    case "concert-this":
        concertThis()
        break
    case "spotify-this-song":
        spotifyThisSong()
        break
    case "movie-this":
        movieThis()
        break
    case "do-what-it-says":
        doWhat()
        break
}

function concertThis() {
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"

    axios.get(URL).then(function (response) {
        var data = response.data[0]

        var concertData = [
            "Venue name: " + data.venue.name,
            "Venue location: " + data.venue.country,
            "Event Date: " + moment(data.datetime).format("MM/DD/YYYY")
        ]
        console.log(divider)
        console.log("concert information for: " + term)
        console.log(divider)
        console.log(concertData[0])
        console.log(concertData[1])
        console.log(concertData[2])
        addToLog(concertThis)
    })
}

function spotifyThisSong() {

    if (term) {
        spotify.search({ type: 'track', query: term }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var songData = [
                "Artist: " + data.tracks.items[0].artists[0].name,
                "Song's Name: " + data.tracks.items[0].name,
                "Preview Link: " + data.tracks.items[0].preview_url,
                "Album: " + data.tracks.items[0].album.name
            ].join("\n\n")
            console.log(divider)
            console.log("Song data for: " + term)
            console.log(divider)
            console.log(songData)
            addToLog(songData)
        })
    } else {
        spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var songData = [
                "Artist: " + data.tracks.items[0].artists[0].name,
                "Song's Name: " + data.tracks.items[0].name,
                "Preview Link: " + data.tracks.items[0].preview_url,
                "Album: " + data.tracks.items[0].album.name
            ].join("\n\n")
            console.log(divider)
            console.log("Default song data for: The Sign")
            console.log("Please enter a song next time")
            console.log(divider)
            console.log(songData)
            addToLog(songData)
        })
    }
}

function movieThis() {
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + term
    if (term) {
        axios.get(URL).then(function (response) {
            var data = response.data
            var movieData = [
                "Movie Title: " + data.Title,
                "Year: " + data.Year,
                "IMDB Rating: " + data.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + data.Ratings[1].Value,
                "Country: " + data.Country,
                "Language: " + data.Language,
                "Plot: " + data.Plot,
                "Actors: " + data.Actors
            ].join("\n\n")
            console.log(divider)
            console.log("Movie information for: " + term)
            console.log(divider)
            console.log(movieData)
            addToLog(movieData)
        })
    } else {
        axios.get("http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody").then(function (response) {
            var data = response.data
            var movieData = [
                "Movie Title: " + data.Title,
                "Year: " + data.Year,
                "IMDB Rating: " + data.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + data.Ratings[1].Value,
                "Country: " + data.Country,
                "Language: " + data.Language,
                "Plot: " + data.Plot,
                "Actors: " + data.Actors
            ].join("\n\n")
            console.log(divider)
            console.log("Default movie information for: Mr Nobody")
            console.log("Please enter a movie next time")
            console.log(divider)
            console.log(movieData)
            addToLog(movieData)
        })
    }
}

function addToLog(data) {
    var divider =
        "\n------------------------------------------------------------\n\n";

    fs.appendFile("log.txt", data + divider, function (error) {
        if (error) throw error;
    });
}


/* Pseudocode for do what it says

    1. write a function to read the random.txt file using fs.readFile
    2. find a way to read the first line in random.txt and input that text
    into my spotifyThis function.

*/


