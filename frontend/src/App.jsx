import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from "./context/PlayerContext";
const url = "http://localhost:4000";

const App = () => {
    const { audioRef, track, albumsData, setUser } = useContext(PlayerContext);
    const displayRef = useRef();
    const location = useLocation();

    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.split("/").pop() : "";
    const bgColor =
        isAlbum && albumsData.length > 0
            ? albumsData.find((x) => x._id == albumId).bgColour
            : "#121212";

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${url}/api/users/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                if (res.data) {
                    setUser(res.data);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
        } else {
            displayRef.current.style.background = "#121212";
        }
    });
    return (
        <div className="h-screen bg-black">
            <div className="h-[90%] flex">
                <Sidebar />
                <div
                    ref={displayRef}
                    className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%]lg"
                >
                    <Outlet />
                </div>
            </div>
            <Player />
            <audio
                ref={audioRef}
                src={track ? track.file : ""}
                preload="auto"
            ></audio>
        </div>
    );
};

export default App;
