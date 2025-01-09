"use client";

import FeatherIcon from 'feather-icons-react';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { saveSong, getSongs, deleteSong, updateSong } from "../lib/clubsActions/songActions.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SongForm({ clubId }) {
    const { data: session } = useSession();
    const [songData, setSongData] = useState({
        title: "",
        artist: "",
        url: "",
    });
    const [songs, setSongs] = useState([]);
    const [editingSongId, setEditingSongId] = useState(null);

    useEffect(() => {
        async function fetchSongs() {
            try {
                const fetchedSongs = await getSongs(clubId);
                setSongs(fetchedSongs);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        }
        fetchSongs();
    }, [clubId]);

    const handleSave = async () => {
        if (!session) {
            toast.error("Has d'iniciar sessió per afegir una canço.");
            return;
        }
        if (!songData.title || !songData.artist || !songData.url) {
            toast.error("Has d'omplir tots els camps.");
            return;
        }
        try {
            if (editingSongId) {
                const updatedSong = await updateSong(editingSongId, songData);
                setSongs(songs.map(song => song.id === editingSongId ? updatedSong : song));
                setEditingSongId(null);
                toast.success("Canço actualitzada correctament.");
            } else {

                const newSong = await saveSong(clubId, session.user.id, songData);
                setSongs([...songs, newSong]);
                toast.success("Canço afegida correctament.");
            }
            setSongData({
                title: "",
                artist: "",
                url: "",
            });

        } catch (error) {
            console.error(":", error);
            toast.error("Hi ha hagut un error. Torna-ho a intentar.");
        }
    };

    const handleEdit = (song) => {
        setSongData({
            title: song.title,
            artist: song.artist,
            url: song.url,
        });
        setEditingSongId(song.id);
    };

    const handleDelete = async (songId) => {
        try {
            await deleteSong(songId);
            setSongs(songs.filter(song => song.id !== songId));
            toast.success("Canço eliminada correctament.");
        } catch (error) {
            console.error("Error eliminando la canción:", error);
            toast.error("Hi ha hagut un error. Torna-ho a intentar.");
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Afageix cançons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Titul</label>
                    <input
                        type="text"
                        value={songData.title}
                        onChange={(e) => setSongData((prev) => ({ ...prev, title: e.target.value }))}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Titul de la canço"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Artista</label>
                    <input
                        type="text"
                        value={songData.artist}
                        onChange={(e) => setSongData((prev) => ({ ...prev, artist: e.target.value }))}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Artista"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Link</label>
                    <input
                        type="text"
                        value={songData.url}
                        onChange={(e) => setSongData((prev) => ({ ...prev, url: e.target.value }))}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Link de la canço"
                    />
                </div>
            </div>

            <button
                onClick={handleSave}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                {editingSongId ? "Actualiza la canço" : "Gurada la canço"}
            </button>

            <h2 className="text-2xl font-bold mt-8 mb-4">Playlist</h2>
            <ul>
                {songs.map(song => (
                    <li key={song.id} className="flex justify-between items-center mb-4">
                        <div>
                            <a href={song.url} target="_blank" rel="noopener noreferrer" className="font-bold underline">{song.title}</a>
                            <p>{song.artist}</p>
                            <a href={song.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Reprodueix</a>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEdit(song)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2"
                            >
                                <FeatherIcon icon="edit" className="" />
                            </button>
                            <button
                                onClick={() => handleDelete(song.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                <FeatherIcon icon="trash-2" className="" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}