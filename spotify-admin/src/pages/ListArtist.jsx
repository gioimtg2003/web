import { useEffect, useState } from "react";
import {
    Table,
    Button,
    Space,
    Tag,
    Dropdown,
    Modal,
    Typography,
    Card,
    message,
} from "antd";

import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    MoreOutlined,
    CheckCircleOutlined,
    StopOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { url } from "../App";

const { Title } = Typography;

export function ArtistsList() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [artistToDelete, setArtistToDelete] = useState(null);

    const handleDeleteClick = (artist) => {
        setArtistToDelete(artist);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        message.success(`Artist "${artistToDelete?.name}" has been deleted.`);
        setIsDeleteModalOpen(false);
        setArtistToDelete(null);
    };
    const fetchArtistList = async () => {
        try {
            const response = await axios.get(`${url}/api/artist`);
            if (response.status === 200) {
                setDataSource(response.data?.data);
            }
        } catch {
            console.log("Error occur");
        }
    };

    useEffect(() => {
        fetchArtistList();
    }, []);

    const getActionMenu = (artist) => {
        return {
            items: [
                {
                    key: "1",
                    label: "View",
                    icon: <EyeOutlined />,
                },
                {
                    key: "2",
                    label: "Edit",
                    icon: <EditOutlined />,
                },
                {
                    key: "3",
                    label: artist.status === "active" ? "Suspend" : "Activate",
                    icon:
                        artist.status === "active" ? (
                            <StopOutlined />
                        ) : (
                            <CheckCircleOutlined />
                        ),
                    danger: artist.status === "active",
                },
                {
                    key: "4",
                    label: "Delete",
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: () => handleDeleteClick(artist),
                },
            ],
        };
    };

    const columns = [
        {
            title: "Artist",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Genre",
            dataIndex: "genre",
            key: "genre",
            sorter: (a, b) => a.genre.localeCompare(b.genre),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag
                    color={
                        status === "active"
                            ? "green"
                            : status === "pending"
                            ? "gold"
                            : "red"
                    }
                >
                    {status.toUpperCase()}
                </Tag>
            ),
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: "Followers",
            dataIndex: "followers",
            key: "followers",
            render: (followers) => followers.toLocaleString(),
            sorter: (a, b) => a.followers - b.followers,
        },
        {
            title: "Tracks",
            dataIndex: "tracks",
            key: "tracks",
            sorter: (a, b) => a.tracks - b.tracks,
        },
        {
            title: "Join Date",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (date) => new Date(date).toLocaleDateString(),
            sorter: (a, b) =>
                new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Dropdown menu={getActionMenu(record)} trigger={["click"]}>
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Title level={4} style={{ margin: 0 }}>
                        Manage Artists
                    </Title>
                </div>

                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="key"
                    pagination={{ pageSize: 10 }}
                />

                <Modal
                    title="Delete Artist"
                    open={isDeleteModalOpen}
                    onOk={confirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    okText="Delete"
                    okButtonProps={{ danger: true }}
                >
                    <p>
                        Are you sure you want to delete {artistToDelete?.name}?
                        This action cannot be undone.
                    </p>
                </Modal>
            </Space>
        </Card>
    );
}
