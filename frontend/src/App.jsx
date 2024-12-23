import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';
import { Routes, Route, useLocation } from 'react-router-dom'; // Don't import BrowserRouter here
import Login from './components/Login';

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);
  const location = useLocation();

  const hiddenRoutes = ["/login"];
  const shouldHideSidebar = hiddenRoutes.includes(location.pathname.toLowerCase());

  const shouldHideComponents = hiddenRoutes.includes(location.pathname.toLowerCase());


  return (
    <>
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
      {!shouldHideSidebar && <Sidebar />}

        <Display />
      </div>
      {!shouldHideComponents && <Player />} {/* Player will only render if not on hidden routes */}
      {!shouldHideComponents && (
        <audio ref={audioRef} src={track.file} preload="auto"></audio>
      )}
    
    </div>
    
    </>
    
  );
};

export default App;
