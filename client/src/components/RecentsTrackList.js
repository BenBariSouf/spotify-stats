import { Link } from "react-router-dom";
import moment from "moment";
import TrackHeader from "./TrackHeader";
import { formatDuration } from "../utils";
import { StyledTrackList } from "../styles";

const RecentsTrackList = ({ tracks }) => (
	<>
		{tracks && tracks.length ? (
			<StyledTrackList>
				<TrackHeader headerText="Last Played" />
				{tracks.map(({ track, played_at }, index) => (
					<li className="track__item" key={index}>
						<div className="track__item__num">{index + 1}</div>
						<Link className="grid__item__inner" to={`/tracks/${track.id}`}>
							<div className="track__item__title-group">
								{track.album.images.length && track.album.images[2] && (
									<div className="track__item__img">
										<img src={track.album.images[2].url} alt={track.name} />
									</div>
								)}
								<div className="track__item__name-artist">
									<div className="track__item__name overflow-ellipsis">{track.name}</div>
									<div className="track__item__artist overflow-ellipsis">
										{track.artists.map((artist, index) => (
											<span key={index}>
												{artist.name}
												{index !== track.artists.length - 1 && ", "}
											</span>
										))}
									</div>
								</div>
							</div>
						</Link>
						<div className="track__item__album overflow-ellipsis">{track.album.name}</div>
						<div>{moment(played_at).fromNow()}</div>

						<div className="track__item__duration">{formatDuration(track.duration_ms)}</div>
					</li>
				))}
			</StyledTrackList>
		) : (
			<p className="empty-notice">No tracks available</p>
		)}
	</>
);

export default RecentsTrackList;
