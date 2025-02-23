import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // Wrap your entire app here
import PlayerContextProvider from "./context/PlayerContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            {" "}
            {/* Wrap the entire app in BrowserRouter */}
            <PlayerContextProvider>
                <App /> {/* Your main app component */}
            </PlayerContextProvider>
        </BrowserRouter>
    </StrictMode>
);
