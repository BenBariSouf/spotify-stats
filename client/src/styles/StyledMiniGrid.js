import styled from "styled-components/macro";

const StyledMiniGrid = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(2, minmax(10px, 1fr));
	grid-gap: var(--spacing-md);

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, minmax(10px, 1fr));
		grid-gap: var(--spacing-lg);
	}

	.grid__item {
		background-color: var(--near-black);
		border-radius: var(--border-radius-subtle);
		transition: background-color 0.3s ease;
		padding-right: var(--spacing-md);
		display: flex;
		align-items: center;
		justify-content: left;
		height: 100px;
		&:hover,
		&:focus {
			background-color: var(--dark-grey);

			img {
				box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
			}

			.grid__item__label {
				text-decoration: none !important;
			}
		}

		a {
			&:hover,
			&:focus {
				text-decoration: none;
			}
		}
	}

	.grid__item__inner {
		padding: var(--spacing-sm);

		@media (min-width: 768px) {
			padding: var(--spacing-md);
		}
	}

	.grid__item__img {
		max-width: 70px;
		height: auto;
		object-fit: cover;
		background-color: var(--dark-grey);
		border-radius: 50%;
	}

	.grid__item__name {
		margin: 0 0 var(--spacing-xxs);
		font-size: var(--fz-md);
		letter-spacing: normal;
	}

	.grid__item__label {
		font-size: var(--fz-sm);
		color: var(--light-grey);
	}
`;

export default StyledMiniGrid;
