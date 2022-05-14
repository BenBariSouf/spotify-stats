import { Link } from "react-router-dom";
import moment from "moment";
import { StyledMiniGrid } from "../styles";

const RecentlyPlayedGrid = ({ tracks }) => (
	<>
		{tracks && tracks.length ? (
			<StyledMiniGrid>
				{tracks.map(({ track, played_at }, i) => (
					<Link to={`/tracks/${track.id}`} key={i}>
						<li className="grid__item">
							<div className="grid__item__inner">
								<div className="img__container">
									{track.album.images.length && track.album.images[0] && <img className="grid__item__img" src={track.album.images[0].url} alt={track.name} type={"artist"} />}
								</div>
							</div>
							<div className="grid__item__info">
								<h3 className="grid__item__name overflow-ellipsis">{track.name}</h3>
								<p className="grid__item__label">{moment(played_at).fromNow()}</p>
							</div>
						</li>
					</Link>
				))}
			</StyledMiniGrid>
		) : (
			<p className="empty-notice">Nothing yet..</p>
		)}
	</>
);

export default RecentlyPlayedGrid;
