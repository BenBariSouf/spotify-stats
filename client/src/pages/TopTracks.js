import { useState, useEffect } from "react";
import { getCurrentUserTopTracks, getCurrentUserFavouriteTracks } from "../spotify";
import { catchErrors } from "../utils";
import { SectionWrapper, TrackList, TimeRangeButtons, Loader } from "../components";

const TopTracks = () => {
	const [topTracks, setTopTracks] = useState(null);
	const [savedTracks, setSavedTracks] = useState([]);
	const [activeRange, setActiveRange] = useState("short");

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await getCurrentUserTopTracks(`${activeRange}_term`);
			setTopTracks(data);

			const userSavedTracks = await getCurrentUserFavouriteTracks();
			const saved = userSavedTracks.data.items.map((element) => element.track.id);
			setSavedTracks(saved);
		};

		catchErrors(fetchData());
	}, [activeRange]);

	return (
		<main>
			<SectionWrapper title="Top Tracks" breadcrumb={true}>
				<TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange} />

				{topTracks && topTracks.items ? <TrackList tracks={topTracks.items} savedTracks={savedTracks} /> : <Loader />}
			</SectionWrapper>
		</main>
	);
};

export default TopTracks;
