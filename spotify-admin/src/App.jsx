import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useAuth } from "../store/useAuth";

export const url = "http://localhost:4000";

const App = () => {
    const { user } = useAuth();
    // if (!user) {
    //     window.location.href = "/login";
    // }
    return (
        <div className="flex items-start min-h-screeen">
            <ToastContainer />
            <Sidebar />

            <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
                <Navbar />

                <div className="pt-8 p1-5 sm:pt-12 sm:pl-12">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default App;
