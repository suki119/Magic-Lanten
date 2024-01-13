import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Breadcrumb,
    Layout,
    Divider,
    Form,
    Input,
    Button,
    Upload,
    message,
    Modal
} from 'antd';
import { appURLs, webAPI } from '../../utils/api';
import QRCode from 'qrcode.react';
import { EyeFilled, EditFilled, UploadOutlined, PlusOutlined, UserOutlined, IdcardOutlined,DownloadOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
const { Item } = Form;
const { Content } = Layout;

function AddPeople(props) {
    const history = useHistory();
    const [form] = Form.useForm();
    const [user, setUser] = useState({});
    const [productId, setProductId] = useState('');
    const [isEditDialogVisible, setEditDialogVisible] = useState(false);
    const [qrCodeData, setQrCodeData] = useState('');

    useEffect(() => {
  

    }, []);

    const onFinish = (values) => {
        console.log(values)
        const formData = new FormData();
        formData.append('ItemName', values.ItemName);

        formData.append('image_data', values.ItemPhoto.file); // Use originFileObj to access the actual file object

        axios
            .post(appURLs.web + webAPI.addImage, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if (response.data.status === '2100') {


                    setQrCodeData(response.data.data.id);
                    setEditDialogVisible(true);


                    // history.push(`/view-image`);
                }
                // console.log('Response:', response.data);
                // message.success('Person added successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
                message.error('Failed to add person');
            });
    };


    const onCancel = () => {

        setEditDialogVisible(false);

    };

    const downloadQRCode = () => {
        const canvas = document.querySelector('canvas'); // Assuming the QR code is rendered using the <canvas> element
        const dataURL = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'qr_code.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };


    return (
        <div>
            <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>Items</Breadcrumb.Item>
                <Breadcrumb.Item>Add</Breadcrumb.Item>
            </Breadcrumb>

            <Content
                className="common-cotent-container"
                style={{
                    background: props.isDarkMode ? 'var(--content-container-bg-dark)' : 'var(--content-container-bg-light)',
                }}
            >
                <Divider orientation="left">Add Item Details</Divider>

                <Form form={form} onFinish={onFinish} labelCol={{ span: 24 }} initialValues={{ personId: productId }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical" style={{ maxWidth: '400px', margin: '0 auto' }} >
                    <Item
                        name="ItemName"
                        label="Item Name"
                        rules={[{ required: true, message: "Please enter the person's name" }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Item>

                    {/* <Item
                        name="personId"
                        label="Product ID"
                        rules={[{ required: true, message: "Please enter the person's ID" }]}
                    >
                        <Input value={user.productId} style={{float:'right'}} prefix={<IdcardOutlined />} />
                    </Item> */}

                    <Item
                        name="ItemPhoto"
                        label="Item Photo"
                        rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            action="/your-image-upload-api"
                            name="image_data"
                            listType="picture-card"
                            accept="image/*"
                            beforeUpload={(file) => {
                                console.log('Uploading image:', file);
                                return false;
                            }}
                        >
                            <Button icon={<UploadOutlined />}></Button>
                        </Upload>
                    </Item>

                    <Item>
                        <Button style={{ backgroundColor: '#5b2f84' }} type="primary" htmlType="submit">
                            Add Item
                        </Button>
                    </Item>
                </Form>
            </Content>

            <Modal
                title="QR"
                visible={isEditDialogVisible}
                onCancel={onCancel}
                onOk={() => { }}
                width={'25%'}
                footer={null}
            >
                {isEditDialogVisible && (
                    <div>
                        {/* Your modal content */}
                        <QRCode value={qrCodeData} />
                        {isEditDialogVisible && (
                            <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                style={{ marginTop: '10px' }}
                                onClick={() => downloadQRCode()}
                            >
                                Download QR Code
                            </Button>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default AddPeople;
