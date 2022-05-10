import styled from "styled-components/macro";

const StyledTrackInfo = styled.main`
	margin-bottom: 50px;
	display: flex;
	justify-content: center;
	align-items: center;

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		@media (min-width: 480px) {
			margin-left: 30px;
		}
	}

	.artwork {
		margin-top: 20px;
		max-width: 250px;
		margin-right: 40px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	}
	.info {
		flex-grow: 1;
	}
	.title {
		font-size: 42px;
		margin: 0 0 5px;
	}
	.artist-name {
		color: var(--light-grey);
		font-weight: 700;
		text-align: left !important;
	}

	.album {
		color: var(--light-grey);
		font-weight: 400;
		font-size: 16px;
	}

	.play-track {
		display: inline-block;
		background-color: var(--green);
		color: var(--white);
		font-weight: 700;
		font-size: var(--fz-xs);
		letter-spacing: 1px;
		text-transform: uppercase;
		border-radius: 50px;
		padding: 11px 24px;
		margin: 20px 0;
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1);

		&:hover,
		&:focus {
			background-color: var(--off-green);
			outline: 0;
		}
	}
	.layout {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.audio-features {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.features {
		display: grid;
		grid-template-columns: repeat(5, minmax(200px, 1fr));
		width: 100%;
		margin-top: 50px;
		margin-bottom: 50px;
		text-align: center;
		border-top: 1px solid var(--grey);
		border-left: 1px solid var(--grey);
		border-radius: var(--border-radius-subtle);

		@media (max-width: 768px) {
			margin: 50px;
			grid-template-columns: repeat(2, minmax(150px, 1fr));
		}

		@media (max-width: 480px) {
			grid-template-columns: repeat(1, minmax(10px, 1fr));
		}
	}

	.feature {
		padding: 15px 10px;
		border-bottom: 1px solid var(--grey);
		border-right: 1px solid var(--grey);
	}

	.feature-text {
		color: var(--light-grey);
		font-size: 30px;
		font-weight: 700;
		margin-bottom: 0;
		@media (max-width: 480px) {
			font-size: 24px;
		}
	}

	.feature-label {
		color: var(--light-grey);
		font-size: var(--fz-sm);
		margin-bottom: 0;
	}
`;

export default StyledTrackInfo;
