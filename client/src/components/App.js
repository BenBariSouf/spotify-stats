import { useEffect, useState } from "react";
import { theme, mixins, Main } from "../styles";
import styled from "styled-components/macro";

import { getAccessToken, logout } from "../spotify";
const LOGIN_URI = "http://localhost:8888/login";

const { colors, fontSizes } = theme;

const AppContainer = styled.div`
	height: 100%;
	min-height: 100vh;
`;
const Login = styled(Main)`
	${mixins.flexCenter};
	flex-direction: column;
	min-height: 100vh;
	h1 {
		font-size: ${fontSizes.xxl};
	}
`;
const LoginButton = styled.a`
	display: inline-block;
	background-color: ${colors.green};
	color: ${colors.white};
	border-radius: 30px;
	padding: 17px 35px;
	margin: 20px 0 70px;
	min-width: 160px;
	font-weight: 700;
	letter-spacing: 2px;
	text-transform: uppercase;
	text-align: center;
	&:hover,
	&:focus {
		background-color: ${colors.offGreen};
	}
`;
const App = () => {
	const [token, setToken] = useState(null);
	useEffect(() => {
		setToken(getAccessToken);
	}, []);

	return (
		<AppContainer>
			{!token ? (
				<Login>
					<h1>Welcome to Spotify</h1>
					<p>You are not logged in. Please click the button below to log in.</p>
					<LoginButton href={LOGIN_URI}>Login</LoginButton>
				</Login>
			) : (
				<>
					<h1>logged in</h1>
					<button onClick={logout}>logout</button>
				</>
			)}
		</AppContainer>
	);
};

export default App;
