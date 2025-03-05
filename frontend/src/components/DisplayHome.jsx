import { Tooltip } from "antd";
import { useContext } from "react";
import { BiPlayCircle, BiPlus } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItems from "./AlbumItems";
import Navbar from "./Navbar";
import SongItem from "./SongItem";

const DisplayHome = () => {
    const { songsData, albumsData, searchSongsData, playWithId } =
        useContext(PlayerContext);

    return (
        <>
            <Navbar />
            {searchSongsData.length > 0 ? (
                <div className="bg-black min-h-screen text-white p-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="space-y-2">
                            {searchSongsData.map((song) => (
                                <div
                                    key={song._id}
                                    className="flex items-center p-2 hover:bg-zinc-800 rounded-md group cursor-pointer"
                                    onClick={() => playWithId(song._id)}
                                >
                                    <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                                        <img
                                            src={
                                                song.image || "/placeholder.svg"
                                            }
                                            alt={`${song.name} cover`}
                                            width={60}
                                            height={60}
                                            className="rounded-md"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <BiPlayCircle
                                                className="w-8 h-8 text-white"
                                                fill="white"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-grow min-w-0">
                                        <h3 className="text-white font-medium truncate">
                                            {song.name}
                                        </h3>
                                        <div className="flex items-center">
                                            <p className="text-zinc-400 text-sm truncate">
                                                {song.album}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Tooltip title="Add favorite">
                                            <button className="text-zinc-400 hover:text-white">
                                                <BiPlus className="w-5 h-5" />
                                            </button>
                                        </Tooltip>
                                        <span className="text-zinc-400 text-sm">
                                            {song.duration}
                                        </span>
                                        <button className="text-zinc-400 hover:text-white">
                                            <FiMoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="text-zinc-400 text-sm opacity-100 group-hover:opacity-0 transition-opacity ml-4">
                                        {song.duration}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <h1 className="my-5 font-bold text-2xl text-white">
                            Featured Charts
                        </h1>
                        <div className="flex overflow-auto ">
                            {(albumsData ?? []).map((item, index) => (
                                <AlbumItems
                                    key={index}
                                    name={item.name}
                                    desc={item.desc}
                                    id={item._id}
                                    image={item.image}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h1 className="my-5 font-bold text-2xl text-white">
                            Today&apos;s Hits
                        </h1>
                        <div className="flex overflow-auto ">
                            {(songsData ?? []).map((item, index) => (
                                <SongItem
                                    key={index}
                                    name={item.name}
                                    desc={item.desc}
                                    id={item._id}
                                    image={item.image}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
export default DisplayHome;
