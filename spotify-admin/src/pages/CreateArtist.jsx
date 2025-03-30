import { useState } from "react";
import {
    Form,
    Input,
    Select,
    Button,
    Upload,
    Switch,
    Card,
    Typography,
    Row,
    Col,
    message,
    Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const options = [
    { value: "rock", label: "Rock" },
    { value: "pop", label: "Pop" },
    { value: "edm", label: "EDM" },
    { value: "hip-hop", label: "Hip-hop" },
    { value: "nhac-dong-que", label: "Nhạc đồng quê" },
    { value: "jazz", label: "Jazz" },
    { value: "nhac-co-dien", label: "Nhạc cổ điển" },
    { value: "nhac-tre", label: "Nhạc trẻ" },
    { value: "nhac-tru-tinh", label: "Nhạc trữ tình" },
    { value: "nhac-rap", label: "Nhạc rap" },
    { value: "nhac-dance", label: "Nhạc dance" },
    { value: "nhac-hoa-tau", label: "Nhạc hòa tấu" },
    { value: "nhac-thieu-nhi", label: "Nhạc thiếu nhi" },
    { value: "nhac-khong-loi", label: "Nhạc không lời" },
];

export function CreateArtist() {
    const [form] = Form.useForm();
    const [bioLength, setBioLength] = useState(0);

    const handleBioChange = (e) => {
        setBioLength(e.target.value.length);
    };

    const onFinish = async (values) => {
        try {
            const { name, email, genre, bio, profilePhoto, verified } = values;
            const formData = new FormData();

            formData.append("name", name);
            formData.append("email", email);
            formData.append(
                "genre",
                options.find((o) => o.value === genre).label
            );
            formData.append("image", profilePhoto?.file);
            formData.append("biography", bio);
            formData.append("verified", verified);

            const response = await axios.post(`${url}/api/artist`, formData);

            if (response.status === 201) {
                message.success("Artist created successfully!");
                form.resetFields();
                setBioLength(0);
            } else {
                toast.error("Something went wrong");
            }
        } catch {
            toast.error("Error occured");
        }
    };

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Title level={4}>Create New Artist</Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ verified: false }}
                >
                    <Row gutter={24}>
                        <Col span={24}>
                            <Title level={5}>Basic Information</Title>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="name"
                                label="Artist Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter artist name",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter artist name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="email"
                                label="Email Address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter email address",
                                    },
                                    {
                                        type: "email",
                                        message: "Please enter a valid email",
                                    },
                                ]}
                            >
                                <Input placeholder="artist@example.com" />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                name="genre"
                                label="Primary Genre"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a genre",
                                    },
                                ]}
                            >
                                <Select placeholder="Select a genre">
                                    {options.map((option) => (
                                        <Option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item name="bio" label="Biography">
                                <TextArea
                                    placeholder="Tell us about the artist..."
                                    rows={4}
                                    onChange={handleBioChange}
                                    maxLength={500}
                                />
                            </Form.Item>
                            <Text type="secondary">
                                {bioLength}/500 characters
                            </Text>
                        </Col>

                        <Col span={24} style={{ marginTop: 24 }}>
                            <Title level={5}>Profile Images</Title>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="profilePhoto"
                                label="Profile Photo"
                            >
                                <Upload
                                    beforeUpload={() => false}
                                    listType="picture"
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Upload Photo
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{ marginTop: 24 }}>
                            <Title level={5}>Account Settings</Title>
                        </Col>
                        <Col xs={24}>
                            <Form.Item name="verified" valuePropName="checked">
                                <Space align="start">
                                    <Switch />
                                    <div>
                                        <Text strong>Verified Artist</Text>
                                        <br />
                                        <Text type="secondary">
                                            Verified artists receive a blue
                                            checkmark and are featured in
                                            recommendations.
                                        </Text>
                                    </div>
                                </Space>
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{ marginTop: 24 }}>
                            <Form.Item>
                                <Space>
                                    <Button type="default">Cancel</Button>
                                    <Button type="primary" htmlType="submit">
                                        Create Artist
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Space>
        </Card>
    );
}
