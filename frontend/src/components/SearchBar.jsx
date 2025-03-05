import { Input, Tooltip } from "antd";
import { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { PlayerContext } from "../context/PlayerContext";

export default function SearchBar() {
    const { handleSearchSong } = useContext(PlayerContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [value, setValue] = useState();
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            className={`flex items-center transition-all duration-300 ease-in-out ${
                isExpanded ? "w-52 " : "w-8"
            }`}
            style={{
                boxShadow: isExpanded
                    ? "0 2px 2px -2px #ffffff" // Bottom-only shadow
                    : "none", // No shadow when collapsed
            }}
        >
            <Input
                prefix={
                    <Tooltip title={"Search"}>
                        <span className="btn-action-toolbar-table btn-action-toolbar-table-search text-[16px]">
                            <BiSearch
                                onClick={handleToggle}
                                className="mr-2 text-white"
                                size={29}
                            />
                        </span>
                    </Tooltip>
                }
                placeholder={isExpanded ? "Search" + "..." : ""}
                onFocus={() => setIsExpanded(true)}
                onBlur={() => {
                    if (!value) setIsExpanded(false);
                }}
                className="pl-0 transition-all duration-300 w-full border-none focus:outline-none h-8 text-white"
                style={{ background: "transparent", boxShadow: "none" }} // Remove background and box shadow
                onChange={(e) => {
                    setValue(e.target.value);
                    handleSearchSong(e.target.value);
                }}
            />
        </div>
    );
}
