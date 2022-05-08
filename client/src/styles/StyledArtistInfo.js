import styled from "styled-components/macro";

const StyledArtistInfo = styled.div`
	flex-direction: column;
	height: 100%;
	text-align: center;
	.artwork {
		border-radius: 100%;
		img {
			object-fit: cover;
			border-radius: 100%;
			width: 320px;
			height: 320px;
		}
	}

	.artist__name {
		font-size: 70px;
		margin-top: var(--spacing-md);
	}
	.stats {
		display: flex;
		justify-content: center;
		text-align: center;
		@media (max-width: 768px) {
			display: inline;
		}
	}
	.stat {
		padding: var(--spacing-lg) var(--spacing-xxl);
		display: inline-block;
	}
	.number {
		color: var(--green);
		font-weight: 700;
		font-size: var(--fz-xxl);
		text-transform: capitalize;
	}
	.numLabel {
		color: var(--light-grey);
		font-size: var(--fz-sm);
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: var(--spacing-lg);
	}

	ul {
		overflow: hidden;
		display: flex;
		list-style: none;
		margin: 0 0 var(--spacing-lg) 0;
		padding: 0;
		@media (max-width: 768px) {
			display: inline;
		}
	}
	li {
		display: flex;
		align-items: center;
		margin-right: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-md);
		background-color: var(--dark-grey);
		border-radius: var(--border-radius-subtle);
		text-align: center;
		cursor: default;
		text-transform: capitalize;
		@media (max-width: 768px) {
			margin-bottom: var(--spacing-sm);
		}

		&:hover,
		&:focus {
			background-color: var(--green);
		}
	}
`;

export default StyledArtistInfo;
