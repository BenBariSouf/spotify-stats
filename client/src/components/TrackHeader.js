import { StyledTrackList } from "../styles";

const TrackHeader = ({ headerText = "" }) => (
	<StyledTrackList>
		<div className="tracklist__header">
			<p className="track__item__num">#</p>
			<p className="">Title</p>
			<p className="">Album</p>
			<p className="">{headerText}</p>
			<p className="track__item__duration">Duration</p>
		</div>
		<hr className="separator" />
	</StyledTrackList>
);

export default TrackHeader;
