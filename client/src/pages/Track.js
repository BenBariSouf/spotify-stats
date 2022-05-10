import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTrackInfo } from "../spotify";
import { catchErrors, formatDuration, parsePitchClass } from "../utils";
import { Loader, FeatureChart, SectionWrapper } from "../components";
import { StyledTrackInfo } from "../styles";

const Track = () => {
	const { id } = useParams();
	const [track, setTrack] = useState(null);
	const [audioAnalysis, setAudioAnalysis] = useState(null);
	const [audioFeatures, setAudioFeatures] = useState(null);

	const navigate = useNavigate();

	// Get artist data based on ID from route params
	useEffect(() => {
		const fetchData = async () => {
			const { track, audioAnalysis, audioFeatures } = await getTrackInfo(id);
			setTrack(track);
			setAudioAnalysis(audioAnalysis);
			setAudioFeatures(audioFeatures);
		};

		catchErrors(fetchData());
	}, [id]);

	//extract the release year from track.album.release_date
	const getYear = (date) => {
		const year = date.split("-")[0];
		return year;
	};

	return (
		<>
			{track ? (
				<StyledTrackInfo>
					<SectionWrapper title="Track" back={true} navigate={navigate}>
						<div>
							<div className="header">
								<img className="artwork" src={track.album.images[0].url} alt="Album Artwork" />
								<div className="info">
									<h1 className="title">{track.name}</h1>
									<h2 className="artist-name">
										{track.artists &&
											track.artists.map(({ name }, i) => (
												<span key={i}>
													{name}
													{track.artists.length > 0 && i === track.artists.length - 1 ? "" : ","}
													&nbsp;
												</span>
											))}
									</h2>
									<h3 className="album">
										<a href={track.album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
											{track.album.name}
										</a>{" "}
										&middot; {getYear(track.album.release_date)}
									</h3>
									<a href={track.external_urls.spotify} target="_blank" className="play-track" rel="noopener noreferrer">
										Play on Spotify
									</a>
								</div>
							</div>

							{audioAnalysis && audioFeatures && (
								<div className="layout">
									<div className="audio-features">
										<div className="features">
											<div className="feature">
												<h4 className="feature-text">{formatDuration(audioFeatures.duration_ms)}</h4>
												<p className="feature-label">Duration</p>
											</div>
											<div className="feature">
												<h4 className="feature-text">{parsePitchClass(audioFeatures.key)}</h4>
												<p className="feature-label">Key</p>
											</div>
											<div className="feature">
												<h4 className="feature-text">{audioFeatures.mode === 1 ? "Major" : "Minor"}</h4>
												<p className="feature-label">Modality</p>
											</div>
											<div className="feature">
												<h4 className="feature-text">{audioFeatures.time_signature}</h4>
												<p className="feature-label">Time Signature</p>
											</div>
											<div className="feature">
												<h4 className="feature-text">{Math.round(audioFeatures.tempo)}</h4>
												<p className="feature-label">Tempo (BPM)</p>
											</div>
											<div className="feature">
												<h4 className="feature-text">{track.popularity}%</h4>
												<p className="feature-label">Popularity</p>
											</div>
											<div className="feature">
												<h4 className="feature-text">{audioAnalysis.bars.length}</h4>
												<p className="feature-label">Bars</p>
											</div>
											<div className="feature">
												<h4 className="feature-text">{audioAnalysis.beats.length}</h4>
												<p className="feature-label">Beats</p>
											</div>
											<div className="feature">
												<h4 className="feature-text">{audioAnalysis.sections.length}</h4>
												<p className="feature-label">Sections</p>
											</div>
											<div className="feature">
												<h4 className="feature-text">{audioAnalysis.segments.length}</h4>
												<p className="feature-label">Segments</p>
											</div>
										</div>

										<FeatureChart features={audioFeatures} type="" />
									</div>
								</div>
							)}
						</div>
					</SectionWrapper>
				</StyledTrackInfo>
			) : (
				<Loader />
			)}
		</>
	);
};

export default Track;
