import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Breadcrumb,
    Layout,
    Divider,
    Table,
    message,
    Button,
    Modal,
    Form,
    Input,
    Image,
    Spin // Import Spin component from Ant Design
} from 'antd';
import Swal from 'sweetalert2'; // Import SweetAlert
import { appURLs, webAPI } from '../../utils/api';
import { Link, useHistory } from "react-router-dom";

const { Content } = Layout;

function ViewAllImages(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedRecord, setEditedRecord] = useState({});
    const [form] = Form.useForm();
    const [user, setUser] = useState({});
    const history = useHistory();

    // Loading state for the spinner
    const [loadingImages, setLoadingImages] = useState(true);

    function getProductId() {
        const User = JSON.parse(localStorage.getItem("user"));
        if (User) {
            setUser(User);
        } else {
            history.push(`/login`);
        }

    }

    useEffect(() => {
       
        const User = JSON.parse(localStorage.getItem("user"));
        setLoadingImages(true); // Set loading state to true while fetching data

        axios.get(`${appURLs.web}${webAPI.getallImageByID}${"PROD002"}`)
            .then((response) => {
                console.log('API Response:', response.data);
                setData(response.data.data); // Assuming the response is an array of image data
            })
            .catch((error) => {
                console.error('Error:', error);
                message.error('Failed to fetch image data');
            })
            .finally(() => {
                setLoadingImages(false); // Set loading state to false when data fetching is done
                setLoading(false);
            });
    }, []);

    const handleUpdate = (record) => {
        setEditedRecord(record);
        form.setFieldsValue({
            image_name: record.image_name,
        });
        setIsModalVisible(true);
    };

    const handleDelete = (record) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this image!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${appURLs.web}${webAPI.deleteImageDetails}${record._id}`)
                    .then((response) => {
                        Swal.fire('Deleted!', 'Your image has been deleted.', 'success');
                        setData(data.filter((item) => item._id !== record._id));
                    })
                    .catch((error) => {
                        console.error('Error deleting image:', error);
                        Swal.fire('Error!', 'Failed to delete the image.', 'error');
                    });
            }
        });
    };

    const columns = [
        {
            title: 'Item Name',
            dataIndex: 'ItemName',
            key: 'ItemName',
        },
     
        {
            title: 'Image',
            dataIndex: 'image_data',
            key: 'image_data',
            render: (image_data) => (
                <Image
                    src={`data:image/jpeg;base64,${image_data}`}
                    alt="Image"
                    style={{ width: '150px', height: '150px', objectFit: 'scale-down' }} // Adjust width and height here
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div style={{
                    display: 'flex',
                    flexDirection: window.innerWidth > 768 ? 'row' : 'column',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <Button type="primary" htmlType="submit" className="common-save-btn common-btn-color" onClick={() => handleUpdate(record)}>Update</Button>
                    <Button type="default" style={{ margin: '0', backgroundColor: props.isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)', color: props.isDarkMode ? 'var(--cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)' }} onClick={() => handleDelete(record)}>Delete</Button>
                </div>
            ),
        }
        
        
    ];


    const updateImageName = (values) => {
        const updatedData = data.map((item) =>
            item._id === editedRecord._id
                ? { ...item, image_name: values.image_name }
                : item
        );

        setData(updatedData);

        axios.put(`${appURLs.web}${webAPI.updateImageDetails}${editedRecord._id}`, {
            image_name: values.image_name,
        })
            .then((response) => {
                console.log('Image name updated:', response.data);
            })
            .catch((error) => {
                console.error('Error updating image name:', error);
                message.error('Failed to update image name');
            });

        setIsModalVisible(false);
    };

    return (
        <div>
            <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>People</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>

            <Content
                className="common-cotent-container"
                style={{
                    background: props.isDarkMode
                        ? 'var(--content-container-bg-dark)'
                        : 'var(--content-container-bg-light',
                }}
            >
                <Divider orientation="left">All Images</Divider>

                {loadingImages ? ( // Conditionally render spinner while loading images
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', textAlign: 'center' }}>
                        <Spin size="large" tip="Images Loading..." />
                    </div>
                ) : data.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record._id}
                        scroll={{ x: true }}
                    />
                ) : (
                    <div>No data available.</div>
                )}

                <Modal
                    title="Update Image Name"
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        onFinish={updateImageName}
                    >
                        <Form.Item
                            name="image_name"
                            label="Image Name"
                            rules={[{ required: true, message: 'Please input the image name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form>
                </Modal>
            </Content>
        </div>
    );
}

export default ViewAllImages;
