import { useState, useEffect } from "react";
import axios from "axios";
import { getRecentlyPlayedTracks } from "../spotify";
import { catchErrors } from "../utils";
import { SectionWrapper, RecentsTrackList, Loader } from "../components";

const RecentlyPlayed = () => {
	const [recentsData, setRecentsData] = useState(null);
	const [recents, setRecents] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await getRecentlyPlayedTracks();
			setRecentsData(data);
		};

		catchErrors(fetchData());
	}, []);

	// When playlistsData updates, check if there are more playlists to fetch
	// then update the state variable
	useEffect(() => {
		if (!recentsData) {
			return;
		}

		// Playlist endpoint only returns 20 playlists at a time, so we need to
		// make sure we get ALL playlists by fetching the next set of playlists
		const fetchMoreData = async () => {
			if (recentsData.next) {
				const { data } = await axios.get(recentsData.next);
				setRecentsData(data);
			}
		};

		// Use functional update to update playlists state variable
		// to avoid including playlists as a dependency for this hook
		// and creating an infinite loop
		const allRecents = [...(recents ? recents : []), ...recentsData.items];

		//remove duplicates
		const filteredRecents = allRecents.filter((value, index, array) => array.findIndex((value2) => value2.id === value.id) === index);
		// console.log("More Data", filteredRecents);

		setRecents(allRecents);

		// Fetch next set of playlists as needed
		catchErrors(fetchMoreData());
	}, [recentsData]);
	return (
		<main>
			<SectionWrapper title="Recently Played" breadcrumb={true}>
				{recents ? <RecentsTrackList tracks={recents} /> : <Loader />}
			</SectionWrapper>
		</main>
	);
};
export default RecentlyPlayed;
