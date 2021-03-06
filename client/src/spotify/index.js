import axios from "axios";

// Map for localStorage keys
const keys = {
	accessToken: "spotify-access-token",
	refreshToken: "spotify-refresh-token",
	expiresIn: "spotify-token-expires-in",
	timestamp: "spotify-token-timestamp",
};

//Map to retrieve localStorage values
const LOCAL_STORAGE_VALUES = {
	accessToken: window.localStorage.getItem(keys.accessToken),
	refreshToken: window.localStorage.getItem(keys.refreshToken),
	expiresIn: window.localStorage.getItem(keys.expiresIn),
	timestamp: window.localStorage.getItem(keys.timestamp),
};

//Logout the user
export const logout = () => {
	for (const property in LOCAL_STORAGE_VALUES) {
		window.localStorage.removeItem(keys[property]);
	}
	//Navigate to the homepage
	window.location = window.location.origin;
};

//Check if the amount of time since the token was last refreshed has expired
const hasTokenExpired = () => {
	const { accessToken, expiresIn, timestamp } = LOCAL_STORAGE_VALUES;

	if (!accessToken || !timestamp) {
		return false;
	}

	const millisecondsSinceTimestamp = Date.now() - Number(timestamp);
	return millisecondsSinceTimestamp > Number(expiresIn) * 1000;
};

//Refresh the access token
const refreshToken = async () => {
	const timeSinceTimestamp = Date.now() - Number(LOCAL_STORAGE_VALUES.timestamp) / 1000;
	try {
		//Logout the user if there's no refresh token stored
		if (!LOCAL_STORAGE_VALUES.refreshToken || LOCAL_STORAGE_VALUES.refreshToken === "undefined" || timeSinceTimestamp < 1000) {
			console.error("No refresh token available");
			logout();
		}

		//Use refresh token endpoint from express app
		const { data } = await axios.get(`/refresh_token?refresh_token=${LOCAL_STORAGE_VALUES.refreshToken}`);

		//Update local storage with new access token and timestamp
		window.localStorage.setItem(keys.accessToken, data.access_token);
		window.localStorage.setItem(keys.expiresIn, data.expires_in);
		window.localStorage.setItem(keys.timestamp, Date.now());

		//Reload the page localStorage values to be reflected
		window.location.reload();
	} catch (error) {
		console.error(error);
	}
};
//Handles the logic for retrieving the access token from localStorage
const getAccessToken = () => {
	//retrieve the access and refresh tokens from the url
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	const queryParams = {
		[keys.accessToken]: urlParams.get("access_token"),
		[keys.refreshToken]: urlParams.get("refresh_token"),
		[keys.expiresIn]: urlParams.get("expires_in"),
	};

	const hasError = urlParams.get("error");

	// If there's an error or the token in localStorage is expired, refresh the token
	if (hasError || hasTokenExpired() || LOCAL_STORAGE_VALUES.accessToken === "undefined") {
		refreshToken();
	}

	// If there is a valid access token in localStorage, return it
	if (LOCAL_STORAGE_VALUES.accessToken && LOCAL_STORAGE_VALUES.accessToken !== "undefined") {
		return LOCAL_STORAGE_VALUES.accessToken;
	}

	//If there is a token in the url, use it to log in for the first time
	if (queryParams[keys.accessToken]) {
		//Store the query parameters in localStorage
		for (const property in queryParams) {
			window.localStorage.setItem(property, queryParams[property]);
		}
		//Set timestamp
		window.localStorage.setItem(keys.timestamp, Date.now());

		window.location.reload();

		//Return the access token
		return queryParams[LOCAL_STORAGE_VALUES.accessToken];
	}
};
export const access_token = getAccessToken();

/**
 * //////////////////////////////////////////////////////////////////////////////////////////////////
 */
//Axios global request headers

axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

///User
// Get current user's profile
export const getCurrentUserProfile = () => axios.get("/me");

//Get current user's playlists
export const getCurrentUserPlaylists = () => axios.get("/me/playlists");

//Get current user's favourite tracks
export const getCurrentUserFavouriteTracks = () => axios.get("/me/tracks");

//Get the current user's top artists or tracks based on calculated affinity
export const getCurrentUserTopArtists = (time_range = "short_term") => axios.get(`/me/top/artists?time_range=${time_range}`);
export const getCurrentUserTopTracks = (time_range = "short_term") => axios.get(`/me/top/tracks?time_range=${time_range}`);

// Get current user's recently played tracks
export const getRecentlyPlayedTracks = () => axios.get("/me/player/recently-played");

///Artist
// Get artist's profile
export const getArtist = (artist_id) => axios.get(`/artists/${artist_id}`);

///Playlist
// Get a Playlist's tracks
export const getPlaylist = (playlist_id) => axios.get(`/playlists/${playlist_id}`);

///Track
// Get a track by its id
export const getTrack = (track_id) => axios.get(`/tracks/${track_id}`);

// Get a track's audio analysis
export const getTrackAnalysis = (track_id) => axios.get(`/audio-analysis/${track_id}`);

// Get a track's audio features
export const getTrackFeatures = (track_id) => axios.get(`/audio-features/${track_id}`);

//Get Audio Features for Several Tracks
export const getAudioFeaturesForTracks = (ids) => axios.get(`/audio-features?ids=${ids}`);

export const getTrackInfo = (track_id) =>
	axios.all([getTrack(track_id), getTrackAnalysis(track_id), getTrackFeatures(track_id)]).then(
		axios.spread((track, audioAnalysis, audioFeatures) => ({
			track: track.data,
			audioAnalysis: audioAnalysis.data,
			audioFeatures: audioFeatures.data,
		}))
	);
