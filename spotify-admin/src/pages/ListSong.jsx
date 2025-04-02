import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Popconfirm } from "antd";

const ListSong = () => {
    const [data, setData] = useState([]);
    const [editingSong, setEditingSong] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        album: "",
        artist: "",
    });
    const [albumData, setAlbumData] = useState([]);
    const [listArtist, setListArtist] = useState([]);

    const fetchArtistList = async () => {
        try {
            const response = await axios.get(`${url}/api/artist`);
            if (response.status === 200) {
                setListArtist(response.data?.data);
            }
        } catch {
            console.log("Error occur");
        }
    };

    // Fetch all songs from the backend
    const fetchSongs = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            if (response.data.success) {
                setData(response.data.songs);
            }
        } catch {
            toast.error("Error occurred while fetching songs");
        }
    };
    const loadAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setAlbumData(response.data.albums);
            } else {
                toast.error("Unable to load albums data");
            }
        } catch {
            toast.error("error occur");
        }
    };

    // Remove a song by ID
    const removeSong = async (id) => {
        try {
            const response = await axios.post(
                `${url}/api/song/remove`,
                { id },
                { headers: { "Content-Type": "application/json" } } // Added header
            );
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchSongs(); // Refresh song list
            }
        } catch {
            toast.error("Error occurred while removing the song");
        }
    };

    // Handle click on "Edit" button
    const handleEditClick = (song) => {
        setEditingSong(song._id);
        setEditForm({
            name: song.name,
            album: song.album,
            artist: song?.artist?._id,
        });
    };

    // Handle changes in edit input fields
    const handleEditChange = (e) => {
        setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Save the edited song
    const saveEdit = async () => {
        try {
            const response = await axios.post(`${url}/api/song/update`, {
                id: editingSong,
                name: editForm.name,
                album: editForm.album,
                artist: editForm.artist,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setEditingSong(null);
                await fetchSongs(); // Refresh song list
            }
        } catch {
            toast.error("Error occurred while updating the song");
        }
    };

    // Fetch songs on component mount
    useEffect(() => {
        fetchSongs();
        loadAlbumData();
        fetchArtistList();
    }, []);

    return (
        <div>
            <p className="text-xl font-semibold">All Songs List</p>
            <br />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Artist</b>
                    <b>Duration</b>
                    <b>Action</b>
                </div>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
                    >
                        <img className="w-12" src={item.image} alt="" />
                        {editingSong === item._id ? (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleEditChange}
                                    className="text-black border border-gray-300 rounded-md px-2"
                                />

                                <select
                                    name="album"
                                    value={editForm.album}
                                    onChange={handleEditChange}
                                    className="text-black border border-gray-300 rounded-md px-2"
                                >
                                    {(albumData ?? []).map((option, idx) => (
                                        <option key={idx} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="artist"
                                    value={editForm.artist}
                                    onChange={handleEditChange}
                                    className="text-black border border-gray-300 rounded-md px-2"
                                >
                                    {(listArtist ?? []).map((option, idx) => (
                                        <option key={idx} value={option._id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </>
                        ) : (
                            <>
                                <p>{item.name}</p>
                                <p>{item.album}</p>
                                <p>{item.artist?.name ?? ""}</p>
                            </>
                        )}
                        <p>{item.duration}</p>
                        {editingSong === item._id ? (
                            <button
                                onClick={saveEdit}
                                className="text-blue-500"
                            >
                                Save
                            </button>
                        ) : (
                            <div className="flex gap-2.5">
                                <button
                                    onClick={() => handleEditClick(item)}
                                    className="text-blue-500"
                                >
                                    <BiEdit size={20} />
                                </button>
                                <Popconfirm
                                    title="Xoá bài hát này"
                                    description="Bạn chắc chắn xoá bài hát này?"
                                    okText="Yes"
                                    cancelText="No"
                                    className="flex justify-center items-center cursor-pointer"
                                    onConfirm={() => removeSong(item._id)}
                                >
                                    <AiOutlineDelete
                                        size={20}
                                        className="text-red-500"
                                    />
                                </Popconfirm>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListSong;
