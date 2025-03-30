import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "./App";
import PropTypes from "prop-types";
import { useAuth } from "../store/useAuth";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";

export const AppProvider = (props) => {
    const { setUser, jwt } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${url}/api/admin/me`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                if (res.data) {
                    setUser(res.data);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <Spin size="large" />;
    }
    return <>{props?.children ?? <Outlet />}</>;
};

AppProvider.propTypes = {
    children: PropTypes.node,
};
