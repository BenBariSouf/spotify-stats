import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getCurrentUserProfile, getCurrentUserPlaylists, getCurrentUserTopTracks, getCurrentUserTopArtists, getCurrentUserFavouriteTracks } from "../spotify";
import { SectionWrapper, ArtistsGrid, TrackList, PlaylistsGrid, Loader } from "../components";
import { StyledHeader, StyledFooter } from "../styles";
import { FaUserAlt } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

const Profile = () => {
	const [profile, setProfile] = useState(null);
	const [playlists, setPlaylists] = useState(null);
	const [favouriteTracks, setFavouriteTracks] = useState(null);
	const [topArtists, setTopArtists] = useState(null);
	const [topTracks, setTopTracks] = useState(null);
	const [savedTracks, setSavedTracks] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const userProfile = await getCurrentUserProfile();
			setProfile(userProfile.data);

			const userPlaylists = await getCurrentUserPlaylists();
			setPlaylists(userPlaylists.data);

			const userFavouriteTracks = await getCurrentUserFavouriteTracks();
			setFavouriteTracks(userFavouriteTracks.data);

			const userTopArtists = await getCurrentUserTopArtists();
			setTopArtists(userTopArtists.data);

			const userTopTracks = await getCurrentUserTopTracks();
			setTopTracks(userTopTracks.data);

			const userSavedTracks = await getCurrentUserFavouriteTracks();
			const saved = userSavedTracks.data.items.map((element) => element.track.id);
			setSavedTracks(saved);
		};
		catchErrors(fetchData());
	}, []);

	return (
		<>
			{profile && (
				<>
					<StyledHeader type="user">
						<a href="https://github.com/BenBariSouf/spotify-stats" title="View on Github" target="_blank">
							<BsGithub size={22} />
						</a>
						<div className="header__inner">
							{profile.images.length && profile.images[0].url ? (
								<img className="header__img" src={profile.images[0].url} alt="Avatar" />
							) : (
								<div className="header__icon">
									<FaUserAlt size={80} />
								</div>
							)}

							<div>
								<div className="header__overline">Profile</div>
								<h1 className="header__name">{profile.display_name}</h1>
								<p className="header__meta">
									{playlists && (
										<span>
											{playlists.total} Playlist{playlists.total !== 1 ? "s" : ""}
										</span>
									)}
									{favouriteTracks && (
										<span>
											{favouriteTracks.total} favourite track{favouriteTracks.total !== 1 ? "s" : ""}
										</span>
									)}
									<span>
										{profile.followers.total} Follower{profile.followers.total !== 1 ? "s" : ""}
									</span>
								</p>
							</div>
						</div>
					</StyledHeader>
					<main>
						{topArtists && topTracks && playlists ? (
							<>
								<SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
									<ArtistsGrid artists={topArtists.items.slice(0, 10)} />
								</SectionWrapper>
								<SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
									<TrackList tracks={topTracks.items.slice(0, 10)} savedTracks={savedTracks} />
								</SectionWrapper>
								<SectionWrapper title="Public Playlists" seeAllLink="/playlists">
									<PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
								</SectionWrapper>

								<StyledFooter>
									<p>
										Made with ❤️ by{" "}
										<a href="https://github.com/BenBariSouf" target="_blank">
											Soufiane
										</a>
									</p>
								</StyledFooter>
							</>
						) : (
							<Loader />
						)}
					</main>
				</>
			)}
		</>
	);
};

export default Profile;
