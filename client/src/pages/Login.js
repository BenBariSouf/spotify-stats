import styled from "styled-components/macro";

const StyledLoginContainer = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
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

const Login = () => (
	<StyledLoginContainer>
		<h1>Welcome to Spotify Stats</h1>
		<StyledLoginButton href="http://localhost:8888/login">Log in to Spotify</StyledLoginButton>
	</StyledLoginContainer>
);

export default Login;
