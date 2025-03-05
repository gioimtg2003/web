import {
    Avatar,
    Button,
    Drawer,
    message,
    Popconfirm,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineGlobal } from "react-icons/ai";
import { BiPhoneCall, BiUser } from "react-icons/bi";
import { MdDeleteOutline, MdMail } from "react-icons/md";
import { url } from "../App";
const { Title, Text, Paragraph } = Typography;

export default function ListUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${url}/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.log(error);
                message.error("Error occur");
            }
        })();
    }, []);

    // State for drawer
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Handle user deletion
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user.id !== userId));
        message.success("User deleted successfully");
    };

    // Handle view details
    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setDrawerVisible(true);
    };

    // Table columns
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <Space>
                    <Avatar icon={<BiUser />} />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "active" ? "green" : "red"}>
                    {status?.toUpperCase() ?? "ACTIVE"}
                </Tag>
            ),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role) => {
                let color = "blue";
                if (role === "Admin") color = "purple";
                if (role === "Viewer") color = "cyan";
                return <Tag color={color}>{role}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<AiOutlineEye />}
                        size="small"
                        onClick={() => handleViewDetails(record)}
                    >
                        View
                    </Button>
                    <Popconfirm
                        title="Delete this user"
                        description="Are you sure you want to delete this user? This action cannot be undone."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <Button
                            type="primary"
                            danger
                            icon={<MdDeleteOutline />}
                            size="small"
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <Title level={2}>User Management</Title>
                <Paragraph>
                    Manage your system users, view their details, or remove them
                    from the system.
                </Paragraph>
            </div>

            <Table
                dataSource={users}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                bordered
            />

            {selectedUser && (
                <Drawer
                    title="User Details"
                    placement="right"
                    destroyOnClose
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    width={400}
                >
                    <div className="flex flex-col space-y-6">
                        <div className="flex justify-center">
                            <Avatar size={80} icon={<BiUser />} />
                        </div>

                        <div>
                            <Title level={3} className="text-center mb-6">
                                {selectedUser.name}
                            </Title>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <MdMail className="mr-3 text-gray-500" />
                                    <Text>{selectedUser.email}</Text>
                                </div>

                                <div className="flex items-center">
                                    <BiUser className="mr-3 text-gray-500" />
                                    <Text>Role: </Text>
                                    <Tag
                                        color={
                                            selectedUser.role === "Admin"
                                                ? "purple"
                                                : selectedUser.role === "Editor"
                                                ? "blue"
                                                : "cyan"
                                        }
                                        className="ml-2"
                                    >
                                        {selectedUser?.role}
                                    </Tag>
                                </div>

                                <div className="flex items-center">
                                    <BiPhoneCall className="mr-3 text-gray-500" />
                                    <Text>
                                        {selectedUser?.phone ??
                                            "+84 368 834 834"}
                                    </Text>
                                </div>

                                <div className="flex items-center">
                                    <AiOutlineGlobal className="mr-3 text-gray-500" />
                                    <Text>
                                        {selectedUser?.location ??
                                            "Ho Chi Minh"}
                                    </Text>
                                </div>

                                <div>
                                    <Text type="secondary">Status: </Text>
                                    <Tag
                                        color={
                                            selectedUser.status === "active"
                                                ? "green"
                                                : "red"
                                        }
                                    >
                                        {selectedUser?.status?.toUpperCase()}
                                    </Tag>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <Popconfirm
                                title="Delete this user"
                                description="Are you sure you want to delete this user? This action cannot be undone."
                                onConfirm={() => {
                                    handleDelete(selectedUser._id);
                                    setDrawerVisible(false);
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    type="primary"
                                    danger
                                    icon={<MdDeleteOutline />}
                                    block
                                >
                                    Delete User
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                </Drawer>
            )}
        </div>
    );
}
