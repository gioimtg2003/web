import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;
export default function Login() {
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
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email!",
                            },
                        ]}
                    >
                        <Input placeholder="Email address" />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input placeholder="Name" />
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
