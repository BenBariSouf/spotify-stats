import styled from "styled-components/macro";

const StyledTrackList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;

	.track__item {
		display: grid;
		align-items: center;
		grid-template-columns: 20px 1fr;
		grid-gap: var(--spacing-md);
		padding: var(--spacing-xs);
		color: var(--light-grey);
		font-size: var(--fz-sm);
		border-radius: var(--border-radius-subtle);
		transition: background-color 0.3s ease;
		cursor: default;

		@media (min-width: 768px) {
			grid-template-columns: 20px 3fr 1fr minmax(50px, 1fr) minmax(50px, 1fr);
			padding: var(--spacing-xs) var(--spacing-sm);
		}

		&:hover,
		&:focus {
			background-color: var(--dark-grey);
		}
	}

	.tracklist__header {
		display: grid;
		grid-template-columns: 20px 3fr 1fr minmax(50px, 1fr) minmax(50px, 1fr);
		grid-gap: var(--spacing-md);
		padding: var(--spacing-xs);
		color: var(--light-grey);
		font-size: var(--fz-xs);
		cursor: default;
		p {
			text-transform: uppercase;
		}
	}

	.separator {
		border: none;
		height: 1px;
		background-color: var(--grey);
		margin-top: -5px;
		margin-bottom: var(--spacing-md);
	}

	.track__item__num {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: var(--fz-xs);
		font-variant-numeric: tabular-nums;
		overflow: visible;
	}

	.track__item__title-group {
		display: flex;
		align-items: center;

		@media (max-width: 768px) {
			display: flex;
			justify-content: space-between;
			text-align: center;
		}
	}

	.track__item__img {
		margin-right: var(--spacing-sm);
		width: 40px;
		height: 40px;
		flex-shrink: 0;
		background-color: var(--dark-grey);
	}

	.track__item__name {
		color: var(--white);
		font-size: var(--fz-md);
	}

	.track__item__album {
		display: none;

		@media (min-width: 768px) {
			display: block;
			white-space: nowrap;
		}
	}
	.tooltip {
		position: absolute;
		display: inline-block;
		right: 150px;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 60px;
		background-color: #595959;
		color: #fff;
		text-align: center;
		padding: 7px 2px;
		border-radius: 6px;
		bottom: 100%;
		left: 50%;
		position: absolute;
		z-index: 1;
		margin-bottom: var(--spacing-xxs);
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
	}

	.track__item__details {
		display: flex;
		align-items: center;
		justify-content: space-between;
		@media (max-width: 768px) {
			position: relative;
		}
	}
	.track__item__saved {
		margin-left: var(--spacing-xxl);
		@media (max-width: 768px) {
			display: none;
		}
	}

	.track__item__saved__sm {
		@media (min-width: 768px) {
			display: none;
		}
	}

	.track__item__duration {
		display: none;
		@media (min-width: 768px) {
			display: flex;
			justify-content: flex-end;
			font-variant-numeric: tabular-nums;
		}
	}
`;

export default StyledTrackList;
