import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Layout,
    Divider,
    Row,
    Col,
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    message as AntMessage,
} from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { appURLs, webAPI } from "../enums/urls";
import Loader from "../component/commonComponent/Loader";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Header, Content } = Layout;

function AddBooking({ isDarkMode }) {
    const [form] = Form.useForm();
    const [loaderStatus, setLoaderStatus] = useState(false);
    const history = useHistory();
    const [user, setUser] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [documentSubLevel, setDocumentSubLevel] = useState([]);
    const [qmsAccess, setQmsAccess] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [Items, setItems] = useState([]);
    const [itemLovData, setItemLovData] = useState([]);
    const [selectedItemsLabel, setSelectedItemsLabel] = useState([]);

    const onFinish = (values) => {
       
        const data = {
            ...values,
            itemList:selectedItemsLabel
        }
       
        axios
            .post(appURLs.web + webAPI.addBooking,data )
            .then((res) => {
               
                if (res.status === 200) {
                    Swal.fire(
                        values.empName + " Updated!",
                        "Employee has been Updated.",
                        "success"
                    );
                    handleClear();
                }
            })
            .catch((error) => {
               
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Network Error",
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.error("Error", error);
            });
    };

    const handleClear = () => {
        setDocumentSubLevel([]);
        form.resetFields();
    };

    const handleItemSelect = (item) => {
        
        setSelectedItems([...selectedItems, item]);
        const itemLable = itemLovData.find(data => data.value === item);
       
        setSelectedItemsLabel([...selectedItemsLabel, itemLable]);
    };

    const handleItemRemove = (index) => {
        console.log(index)
        const updatedItems = [...selectedItemsLabel];
        updatedItems.splice(index, 1);
        setSelectedItemsLabel(updatedItems);
    };


    const createLovData = (data) => {

       
        let itemList = [];
        if (data) {
            data.map(obj => {
                let data = {
                    label: obj.ItemName,
                    value: obj._id
                }
                itemList.push(data)
            })
        }
        console.log(itemList)
        setItemLovData(itemList);

    }

    const getAllItems = () => {

        axios.get(appURLs.web + webAPI.getallImageDetails).then((res) => {
            setItems(res.data.data);
            createLovData(res.data.data);
        })


    }

    useEffect(() => {
        getAllItems();
    }, []);

    return (
        <div>
            <Breadcrumb style={{ margin: "10px 0" }}>
                <Breadcrumb.Item>Booking</Breadcrumb.Item>
                <Breadcrumb.Item>Add Booking</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={24}>
                    <Content
                        className="common-cotent-container"
                        style={{
                            background: isDarkMode
                                ? "var(--content-container-bg-dark)"
                                : "var(--content-container-bg-light)",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                        }}
                    >
                        <Divider orientation="left" orientationMargin="0">
                            Basic Details
                        </Divider>

                        <Form
                            form={form}
                            name="pdfUploadForm"
                            onFinish={(values) => onFinish(values)}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            layout="vertical"
                        >
                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label="Booking Name"
                                        name="bookingName"
                                        rules={[
                                            { required: true, message: "Please input the Booking Name!" },
                                        ]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>
                                <Col lg={12} xs={24}>
                                    <Item label="Booking Date" name="bookingDate">
                                        <DatePicker style={{ width: "100%" }} />
                                    </Item>
                                </Col>
                            </Row>

                            {/* Item Selection */}
                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label="Select Item"
                                        name="selectedItem"
                                        rules={[
                                            { required: true, message: "Please select an item!" },
                                        ]}
                                    >
                                        <Select onSelect={handleItemSelect} options={itemLovData} />
                                          
                                       
                                    </Item>
                                </Col>
                                <Col lg={12} xs={24}>
                                    <Item label="Selected Items">
                                        <ul>
                                            {selectedItemsLabel.map((item, index) => (
                                                <li key={index}>
                                                    {item.label}{" "}
                                                    <Button
                                                        type="link"
                                                        onClick={() => handleItemRemove(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </Item>
                                </Col>
                            </Row>

                            <Row style={{ marginBottom: "10px" }}>
                                <Col span={24} style={{ textAlign: "right" }}>
                                    <Button
                                        type="default"
                                        onClick={handleClear}
                                        style={{
                                            marginRight: "8px",
                                            backgroundcolor: isDarkMode
                                                ? "var(--cancel-btn-bg-dark)"
                                                : "var(--cancel-btn-bg-light)",
                                            color: isDarkMode
                                                ? "var( --cancel-btn-color-dark)"
                                                : "var(--cancel-btn-color-light)",
                                        }}
                                    >
                                        <span style={{ fontWeight: "700" }}>RESET</span>
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="common-save-btn common-btn-color"
                                    >
                                        <span style={{ fontWeight: "600" }}>SAVE</span>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Content>
                </Col>
            </Row>
            {loaderStatus && <Loader />}
        </div>
    );
}

export default AddBooking;
