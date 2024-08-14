import styled from "styled-components/macro";

const StyledLoginContainer = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;

	h1 {
		margin-bottom: var(--spacing-md);
	}
`;

const StyledLoginButton = styled.a`
	display: inline-block;
	background-color: var(--green);
	color: var(--white);
	border-radius: var(--border-radius-pill);
	font-weight: 700;
	font-size: var(--fz-lg);
	padding: var(--spacing-sm) var(--spacing-xl);
	margin-top: var(--spacing-sm);

	&:hover,
	&:focus {
		text-decoration: none;
		filter: brightness(1.2);
	}
`;

// const LOGIN_URI = process.env.NODE_ENV !== "production" ? "http://localhost:8888/login" : "https://spotify-statis.onrender.com/login";
const LOGIN_URI = process.env.NODE_ENV !== "production" ? "http://localhost:8888/login" : "https://web-production-f010d.up.railway.app/login";


const Login = () => (
	<StyledLoginContainer>
		<h1>Welcome to Spotify Stats</h1>
		<h3>THE web app for visualizing your personalized Spotify data</h3>
		<StyledLoginButton href={LOGIN_URI}>Log in to Spotify</StyledLoginButton>
	</StyledLoginContainer>
);

export default Login;
