import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../App";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button, Drawer, Popconfirm } from "antd";
import { BiPlus } from "react-icons/bi";
import { assets } from "../assets/assets";

const ListAlbum = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = useState(false);
    const [colour, setColour] = useState("#ffffff");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("desc", desc);
            formData.append("image", image);
            formData.append("bgColour", colour);

            const response = await axios.post(`${url}/api/album/add`, formData);
            if (response.data.success) {
                fetchAlbums();
                toast.success("Album Added");
                setDesc("");
                setImage(false);
                setName("");
                setOpen(false);
            } else {
                toast.error("Something went wrong");
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Error occurred");
        }
        setLoading(false);
    };
    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setData(response.data.albums);
            }
        } catch {
            toast.error("Error occur");
        }
    };

    const removeAlbum = async (id) => {
        try {
            const response = await axios.post(`${url}/api/album/remove`, {
                id,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchAlbums();
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Error occur");
        }
    };
    useEffect(() => {
        fetchAlbums();
    }, []);

    return (
        <>
            <Drawer
                closable
                destroyOnClose
                title={<p>Tạo mới Album</p>}
                placement="right"
                open={open}
                onClose={() => setOpen(false)}
            >
                <form
                    onSubmit={onSubmitHandler}
                    className="flex flex-col items-start gap-8 text-gray-600"
                >
                    <div className="flex flex-col gap-4">
                        <p>Upload Image</p>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id="image"
                            accept="image/*"
                            hidden
                        />
                        <label htmlFor="image">
                            <img
                                className="w-24 cursor-pointer"
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : assets.upload_area
                                }
                                alt=""
                            />
                        </label>
                    </div>

                    <div className="flex flex-col gap-2.5 w-full">
                        <p>Album Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-full"
                            type="text"
                            placeholder="Type here"
                        />
                    </div>

                    <div className="flex flex-col gap-2.5 w-full">
                        <p>Album Description</p>
                        <input
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-full"
                            type="text"
                            placeholder="Type here"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <p>Backround Color</p>
                        <input
                            onChange={(e) => setColour(e.target.value)}
                            value={colour}
                            type="color"
                        />
                    </div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="px-8 py-3"
                    >
                        Thêm mới
                    </Button>
                </form>
            </Drawer>
            <div>
                <div className="w-full justify-between flex items-center px-4">
                    <p className="text-xl font-semibold">All Albums List</p>
                    <Button
                        type="primary"
                        onClick={() => setOpen(true)}
                        icon={<BiPlus />}
                    >
                        Thêm Album
                    </Button>
                </div>

                <br />
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border-gray-300 text-sm mr-5 bg-gray-100">
                    <b> Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Colour </b>
                    <b>Action</b>
                </div>
                {data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border-gray-300 text-sm mr-5 bg-gray-100"
                        >
                            <img className="w-12" src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColor} />
                            <Popconfirm
                                title="Xoá Ablum này?"
                                description="Bạn chắc chắn xoá Album này?"
                                okText="Yes"
                                cancelText="No"
                                className="flex justify-center items-center cursor-pointer"
                                onConfirm={() => removeAlbum(item._id)}
                            >
                                <MdOutlineDeleteForever color="red" size={32} />
                            </Popconfirm>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ListAlbum;
