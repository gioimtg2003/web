import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = "http://localhost:4000";

    const [songsData, setSongsData] = useState([]);
    const [user, setUser] = useState();
    const [searchSongsData, setSearchSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        },
    });
    const handleSearchSong = (value) => {
        if (value === "") {
            setSearchSongsData([]);
            return;
        }
        const searchResult = songsData.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchSongsData(searchResult);
    };
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };
    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (id == item._id) {
                setTrack(item);
            }
        });
        await audioRef.current.play();
        setPlayStatus(true);
    };

    const previous = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._item && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        });
    };
    const next = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index < songsData.length) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        });
    };
    const seekSong = async (e) => {
        audioRef.current.currentTime =
            (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
            audioRef.current.duration;
    };
    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            /* empty */
        }
    };
    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            /* empty */
        }
    };
    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width =
                    Math.floor(
                        (audioRef.current.currentTime /
                            audioRef.current.duration) *
                            100
                    ) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            };
        }, 1000);
    }, [audioRef]);

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);
    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        searchSongsData,
        handleSearchSong,
        albumsData,
        setUser,
        user,
    };
    return (
        <PlayerContext.Provider value={contextValue}>
            {props?.children ? props?.children : <Outlet />}
        </PlayerContext.Provider>
    );
};

PlayerContextProvider.propTypes = {
    children: PropTypes.node,
};
export default PlayerContextProvider;
