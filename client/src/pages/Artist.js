import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArtist } from "../spotify";
import { catchErrors } from "../utils";
import { SectionWrapper, Loader } from "../components";
import { StyledArtistInfo } from "../styles";

const Artist = () => {
	const { id } = useParams();
	const [artist, setArtist] = useState(null);
	const navigate = useNavigate();

	// Get artist data based on ID from route params
	useEffect(() => {
		const fetchData = async () => {
			const { data } = await getArtist(id);
			setArtist(data);
		};

		catchErrors(fetchData());
	}, [id]);

	return (
		<main>
			<SectionWrapper title="Artist" back={true} navigate={navigate}>
				{artist ? (
					<StyledArtistInfo>
						{artist.images[0] && (
							<div className="artwork">
								<img src={artist.images[0].url} alt={artist.name} />
							</div>
						)}
						<h1 className="artist__name">{artist.name}</h1>

						<div className="stats">
							<div className="stat">
								<p className="numLabel">followers</p>
								<p className="number">{artist.followers.total.toLocaleString()} </p>
							</div>

							<div className="stat">
								<p className="numLabel">genres</p>
								<ul>
									{artist.genres.map((genre) => (
										<li key={genre}>{genre}</li>
									))}
								</ul>
							</div>

							<div className="stat">
								<p className="numLabel">popularity</p>
								<p className="number">{artist.popularity}% </p>
							</div>
						</div>
					</StyledArtistInfo>
				) : (
					<Loader />
				)}
			</SectionWrapper>
		</main>
	);
};

export default Artist;
