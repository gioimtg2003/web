import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListSong = () => {
  const [data, setData] = useState([]);
  const [editingSong, setEditingSong] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', album: '' });

  // Fetch all songs from the backend
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error('Error occurred while fetching songs');
    }
  };

  // Remove a song by ID
  const removeSong = async (id) => {
    try {
      const response = await axios.post(
        `${url}/api/song/remove`,
        { id },
        { headers: { 'Content-Type': 'application/json' } } // Added header
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs(); // Refresh song list
      }
    } catch (error) {
      toast.error('Error occurred while removing the song');
    }
  };

  // Handle click on "Edit" button
  const handleEditClick = (song) => {
    setEditingSong(song._id);
    setEditForm({ name: song.name, album: song.album });
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
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEditingSong(null);
        await fetchSongs(); // Refresh song list
      }
    } catch (error) {
      toast.error('Error occurred while updating the song');
    }
  };

  // Fetch songs on component mount
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
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
                <input
                  type="text"
                  name="album"
                  value={editForm.album}
                  onChange={handleEditChange}
                  className="text-black border border-gray-300 rounded-md px-2"
                />
              </>
            ) : (
              <>
                <p>{item.name}</p>
                <p>{item.album}</p>
              </>
            )}
            <p>{item.duration}</p>
            {editingSong === item._id ? (
              <button onClick={saveEdit} className="text-blue-500">
                Save
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <p
                  className="cursor-pointer text-red-500"
                  onClick={() => removeSong(item._id)}
                >
                  x
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSong;
