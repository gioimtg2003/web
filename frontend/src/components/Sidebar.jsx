import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import SearchBar from "./SearchBar";

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, playList, playWithId } = useContext(PlayerContext);

    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 pl-8 cursor-pointer"
                >
                    <img className="w-6" src={assets.home_icon} alt=" Home" />
                    <p className="font-bold">Home</p>
                </div>
                <div className="flex items-center gap-3 pl-8 cursor-pointer">
                    <SearchBar />
                </div>
            </div>
            <div className="bg-[#121212] h-[85%] rounded flex flex-col">
                <div className="p-4 flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <img
                            className="w-8"
                            src={assets.stack_icon}
                            alt=" Library"
                        />
                        <p className="font-semibold">Your library</p>
                    </div>
                </div>
                {!user ? (
                    <p className="p-4 text-center">Login to view library</p>
                ) : (
                    <div className="w-full flex flex-col">
                        {playList.map((item) => (
                            <div
                                key={item._id}
                                className="p-4 flex items-center gap-3 cursor-pointer hover:bg-zinc-800"
                                onClick={() => playWithId(item._id)}
                            >
                                <img
                                    className="w-12"
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-zinc-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
