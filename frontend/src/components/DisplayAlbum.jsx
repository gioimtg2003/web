import dayjs from "dayjs";
import "dayjs/locale/vi"; // Sử dụng tiếng Việt
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import Navbar from "./Navbar";
dayjs.extend(relativeTime);
dayjs.locale("vi");

const DisplayAlbum = () => {
    const { id } = useParams();
    const [albumData, setAlbumData] = useState("");
    const { playWithId, albumsData, songsData } = useContext(PlayerContext);

    useEffect(() => {
        albumsData.map((item) => {
            if (item._id === id) {
                setAlbumData(item);
            }
        });
    }, []);

    return albumData ? (
        <>
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-50 rounded" src={albumData.image} alt="" />
                <div className="flex flex-col text-white">
                    <p>Playlist</p>
                    <h2 className="text-6xl font-bold mb-4 md:text-7xl">
                        {albumData.name}
                    </h2>
                    <h4>{albumData.desc}</h4>
                </div>
            </div>
            <div className="grid grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p>
                    <b>#</b>Title
                </p>
                <p>Album</p>
                <p className="hidden sm:block">Date Added</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>
            <hr />
            {songsData
                .filter((item) => item.album === albumData.name)
                .map((item, index) => (
                    <div
                        onClick={() => playWithId(item._id)}
                        key={index}
                        className="grid grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                    >
                        <p className="text-white flex items-center  ">
                            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                            <img
                                className="inline w-10 mr-5"
                                src={item.image}
                                alt=""
                            />
                            <div className="flex flex-col items-center gap-y-1">
                                <p> {item.name}</p>
                                <p className="text-gray-400">
                                    {item.artist?.name ?? ""}
                                </p>
                            </div>
                        </p>
                        <p className="text-[15px]">{albumData.name}</p>
                        <p className="text-[15px] hidden sm:block">
                            {dayjs(item?.createdAt ?? "25/02/2025").fromNow()}
                        </p>
                        <p className="text-[15px] text-center">
                            {item.duration}
                        </p>
                    </div>
                ))}
        </>
    ) : null;
};
DisplayAlbum.propTypes = {
    album: PropTypes.object.isRequired,
};

export default DisplayAlbum;
