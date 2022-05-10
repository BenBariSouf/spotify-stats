import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { GlobalStyle } from "./styles";
import { logout, access_token } from "./spotify";
import MadeWithLove from "react-made-with-love";

import { Login, Profile, TopArtists, Artist, TopTracks, Playlists, Playlist, Track } from "./pages";

const StyledLogoutButton = styled.button`
	position: absolute;
	top: var(--spacing-lg);
	right: var(--spacing-md);
	padding: var(--spacing-sm) var(--spacing-md);
	background-color: rgba(0, 0, 0, 0.7);
	color: var(--white);
	font-size: var(--fz-xxs);
	letter-spacing: 1px;
	font-weight: 600;
	border-radius: var(--border-radius-pill);
	z-index: 10;
	text-transform: uppercase;
	@media (min-width: 768px) {
		right: var(--spacing-lg);
	}

	&:hover {
		cursor: pointer;
		color: var(--black);
		background-color: var(--white);
	}
`;

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
const App = () => {
	const [token, setToken] = useState(null);
	useEffect(() => {
		setToken(access_token);
	}, []);

	return (
		<div className="app">
			<GlobalStyle />

			{!token ? (
				<Login />
			) : (
				<>
					<StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>

					<ScrollToTop />
					<Routes>
						<Route path="/" element={<Profile />} />
						<Route path="/top-artists" element={<TopArtists />} />
						<Route path="/artists/:id" element={<Artist />} />
						<Route path="/top-tracks" element={<TopTracks />} />
						<Route path="/playlists" element={<Playlists />} />
						<Route path="/playlists/:id" element={<Playlist />} />
						<Route path="/tracks/:id" element={<Track />} />
					</Routes>
				</>
			)}

			<div className="footer">
				<MadeWithLove by="Soufiane" emoji link="https://github.com/BenBariSouf" />
			</div>
		</div>
	);
};

export default App;
