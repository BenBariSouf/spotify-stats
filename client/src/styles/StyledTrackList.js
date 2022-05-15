import styled from "styled-components/macro";

const StyledTrackList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;

	.track__item {
		display: grid;
		align-items: center;
		grid-template-columns: ${(props) => (props.columns == 5 ? "20px 3fr minmax(120px, 1fr)" : "20px 3fr 2fr")};
		grid-gap: var(--spacing-md);
		padding: var(--spacing-xs);
		color: var(--light-grey);
		font-size: var(--fz-sm);
		border-radius: var(--border-radius-subtle);
		transition: background-color 0.3s ease;
		cursor: default;
		@media (min-width: 768px) {
			display: grid;
			grid-template-columns: 20px ${(props) => (props.columns == 5 ? " 5fr" : "4fr ")} 2.5fr minmax(50px, 1fr) minmax(50px, 1fr);
			padding: var(--spacing-xs) var(--spacing-sm);
		}

		&:hover,
		&:focus {
			background-color: var(--dark-grey);
		}
	}

	.tracklist__header {
		display: grid;
		align-items: center;
		justify-content: space-between;
		grid-template-columns: 2.5fr 2fr minmax(50px, 1fr);
		grid-gap: var(--spacing-md);
		padding: var(--spacing-xs);
		color: var(--light-grey);
		font-size: var(--fz-xs);
		cursor: default;
		p {
			text-transform: uppercase;
		}

		@media (min-width: 768px) {
			display: grid;
			grid-template-columns: 20px ${(props) => (props.columns == 5 ? " 5fr" : "4fr ")} 2.5fr minmax(50px, 1fr) minmax(50px, 1fr);
			padding: var(--spacing-xs) var(--spacing-sm);
		}

		.tracklist__header__album {
			@media (max-width: 768px) {
				display: none;
			}
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
		@media (max-width: 768px) {
			position: absolute;
			left: 75px;
		}
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
		position: absolute;
		left: 100px;
		@media (min-width: 768px) {
			display: none;
		}
	}

	.hash {
		margin-left: var(--spacing-xs);
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
