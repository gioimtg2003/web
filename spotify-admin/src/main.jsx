import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { ConfigProvider } from "antd";
import AddSong from "./pages/AddSong.jsx";
import ListSong from "./pages/ListSong.jsx";
import ListAlbum from "./pages/ListAlbum.jsx";
import ListUser from "./pages/ListUser.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#1DB954",
                    },
                }}
            >
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route
                            path="/add-song"
                            element={<AddSong />}
                            key="add-song"
                        />
                        <Route
                            path="/list-song"
                            element={<ListSong />}
                            key={"list-song"}
                        />
                        <Route
                            path="/list-album"
                            element={<ListAlbum />}
                            key="list-album"
                        />
                        <Route
                            path="/list-user"
                            element={<ListUser />}
                            key="list-user"
                        />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);
