import { StyledTrackList } from "../styles";

const TrackHeader = ({ headerText = "" }) => (
	<StyledTrackList>
		<div className="tracklist__header">
			<p className="hash">#</p>
			<p className="">Title</p>
			<p className="tracklist__header__album">Album</p>
			<p className="">{headerText}</p>
			<p className="track__item__duration">Duration</p>
		</div>
		<hr className="separator" />
	</StyledTrackList>
);

export default TrackHeader;
