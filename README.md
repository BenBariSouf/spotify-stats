# Spotify Stats

> A web app for visualizing personalized Spotify statistics

Try it out [here.](https://spotify-statis.onrender.com/)

## Features

With Spotify stats, you can easily know -

- A list of your **recently palyed tracks**.
- Your most favourite **artists** of all time.
- Popularity score, genres, and follower count of your favourite artists.
- Your most listened to **tracks**.
- A comprehensive description of each track's audio features.
- Your most favourite **playlists**, with the ability to sort each playlist based on different metrics(Danceability, Tempo, Energy)
- And more...

## Tech/Framework Used

- [Create React App CLI](https://github.com/facebook/create-react-app)
- [Express](https://expressjs.com/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://www.styled-components.com/)
- [Axios](https://axios-http.com/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Chart.js](https://www.chartjs.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Installation and setup

This project requires [node](http://nodejs.org) and [npm](https://npmjs.com) installed globally.

[Register a Spotify App](https://developer.spotify.com/dashboard/applications) and add `http://localhost:8888/callback` as a Redirect URI in the app settings

Clone the repository to a directory of your choosing

```sh
$ git clone https://github.com/BenBariSouf/spotify-stats.git
```

Navigate into spotify-stats and install the necessary packages for both the server and the client directories

```sh
$ npm install
```

```sh
$ cd client && npm install
```

Create an `.env` file in the root of the project based on `.env.example`

```sh
CLIENT_ID = [client id optained from the Spotify Developer Dashboard]
CLIENT_SECRET = [client secret optained from the Spotify Developer Dashboard]
FRONTEND_URI = http://localhost:3000
REDIRECT_URI = http://localhost:8888/callback
```

To start up the app locally

```sh
$ npm start
```
