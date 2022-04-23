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
export const getAccessToken = () => {
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

		//Return the access token
		return queryParams[LOCAL_STORAGE_VALUES.accessToken];
	}
};
// export const accessToken = getAccessToken();
