"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { saveSong } from "../lib/clubsActions/songActions.js";

export default function SongForm({ clubId }) {
    const { data: session } = useSession();
    const [songData, setSongData] = useState({
        title: "",
        artist: "",
        url: "",
    });

    const handleSave = async () => {
        if (!session) {
            alert("Has de iniciar sesión para agregar canciones.");
            return;
        }

        try {
            await saveSong(clubId, session.user.id, songData);
            alert("Canción agregada correctamente.");
            setSongData({
                title: "",
                artist: "",
                url: "",
            });
        } catch (error) {
            console.error("Error agregando la canción:", error);
            alert("Hubo un error. Inténtalo de nuevo.");
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
                        placeholder="Título de la canción"
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
                        placeholder="Link de la canción"
                    />
                </div>
            </div>

            <button
                onClick={handleSave}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Guardar canción
            </button>
        </div>
    );
}