import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Wrap your entire app here
import App from "./App.jsx";
import DisplayAlbum from "./components/DisplayAlbum.jsx";
import DisplayHome from "./components/DisplayHome.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            {/* Wrap the entire app in BrowserRouter */}
            <PlayerContextProvider>
                <Routes>
                    <Route element={<App />}>
                        <Route path="/" element={<DisplayHome />} />
                        <Route path="/album/:id" element={<DisplayAlbum />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
                {/* Your main app component */}
            </PlayerContextProvider>
        </BrowserRouter>
    </StrictMode>
);
