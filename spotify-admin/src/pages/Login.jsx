import { Button, Form, Input, Typography } from "antd";
import axios from "axios";
import { url } from "../App";

import { useAuth } from "../../store/useAuth";

const { Title } = Typography;
export default function Login() {
    const { setJWT, jwt, setUser } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-50 shadow-gray-800">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img
                        src="/src/assets/logo.png"
                        className="mt-5 w-[max(10vw,100px)] hidden sm:block"
                        alt=""
                    />
                </div>

                <Title level={3} className="text-center  mb-8">
                    Log in to Admin Panel
                </Title>

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    layout="vertical"
                    size="large"
                    onFinish={async (values) => {
                        try {
                            const res = await axios.post(
                                `${url}/api/admin/login`,
                                {
                                    username: values.username,
                                    password: values.password,
                                }
                            );
                            if (res.data?.success) {
                                setJWT(res.data.token);
                                const getProfile = await axios.get(
                                    `${url}/api/admin/me`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${jwt}`,
                                        },
                                    }
                                );
                                if (getProfile.data) {
                                    setUser(res.data);
                                    window.location.href = "/";
                                }
                            }
                        } catch (error) {
                            console.log("Error:", error);
                        }
                    }}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input type="password" placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item className="mt-12 px-8">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                        >
                            LOG IN
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
