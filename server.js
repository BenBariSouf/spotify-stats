require("dotenv").config();

const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const path = require("path");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "./client/build")));

//Function to generate a random string containing numbers and letters
const generateRandomString = (length) => {
	let result = "";
	let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const stateKey = "spotify_auth_state"; // state key for spotify auth

app.get("/login", (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);

	//authorization scopes
	const scope = ["user-read-private", " user-read-email", "user-top-read", "user-library-read", "user-read-recently-played"].join(" ");

	const queryParameters = querystring.stringify({
		response_type: "code",
		client_id: CLIENT_ID,
		redirect_uri: REDIRECT_URI,
		scope,
		state,
	});
	res.redirect(`https://accounts.spotify.com/authorize?${queryParameters}`);
});

app.get("/callback", (req, res) => {
	var code = req.query.code || null;

	axios({
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		data: querystring.stringify({
			grant_type: "authorization_code",
			code,
			redirect_uri: REDIRECT_URI,
		}),
		headers: {
			content_type: "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
		},
	})
		.then((response) => {
			if (response.status === 200) {
				const { access_token, refresh_token, expires_in } = response.data;

				const queryParams = querystring.stringify({
					access_token,
					refresh_token,
					expires_in,
				});

				//redirect to the frontend
				res.redirect(`${FRONTEND_URI}/?${queryParams}`);
			} else {
				const queryParams = querystring.stringify({
					error: "Invalid token",
				});
				res.redirect(`/?${queryParams}`);
			}
		})
		.catch((error) => {
			res.send(error);
		});
});

app.get("/refresh_token", (req, res) => {
	var { refresh_token } = req.query;

	axios({
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		data: querystring.stringify({
			grant_type: "refresh_token",
			refresh_token,
		}),
		headers: {
			content_type: "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
		},
	})
		.then((response) => {
			if (response.status == 200) {
				const { token_type, access_token } = response.data;
				res.send({ token_type, access_token });
			} else {
				res.send(response.status);
			}
		})
		.catch((error) => {
			res.send(error);
		});
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
