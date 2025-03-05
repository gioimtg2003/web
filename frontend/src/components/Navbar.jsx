import { Popover, Tooltip } from "antd";
import { useContext } from "react";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { hashNameToColorHex } from "../../image.helper";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useContext(PlayerContext);
    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2 ">
                    <img
                        onClick={() => navigate(-1)}
                        className="w-8 bg-black p-2 roundex-2x1 cursor-pointer"
                        src={assets.arrow_left}
                        alt=""
                    />
                    <img
                        onClick={() => navigate(+1)}
                        className="w-8 bg-black p-2 roundex-2x1 cursor-pointer"
                        src={assets.arrow_right}
                        alt=""
                    />
                </div>
                <div className="flex items-center gap-4">
                    <p className="bg-white text-black text-[15px] px-4 py-1 rounded -2x1 hidden md:block cursor-pointer">
                        Explorer Premium{" "}
                    </p>
                    <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer text-white">
                        Install App
                    </p>
                    {user ? (
                        <Popover
                            content={
                                <div className="flex flex-col gap-2">
                                    <p
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            navigate("/login");
                                        }}
                                        className="cursor-pointer"
                                    >
                                        Logout
                                    </p>
                                </div>
                            }
                        >
                            <p
                                style={{
                                    backgroundColor: hashNameToColorHex(
                                        user?.name[0] ?? "N"
                                    ),
                                }}
                                className={` text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer`}
                            >
                                {user?.name[0] ?? "N"}
                            </p>
                        </Popover>
                    ) : (
                        <Tooltip title="Login">
                            <BiLogIn
                                className="w-7 h-7 cursor-pointer"
                                onClick={() => navigate("/login")}
                            />
                        </Tooltip>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
                    All
                </p>
                <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer text-white">
                    Music
                </p>
                <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer text-white">
                    Podcasts
                </p>
            </div>
        </>
    );
};
export default Navbar;
