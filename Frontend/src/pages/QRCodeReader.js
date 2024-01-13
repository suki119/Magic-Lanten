import React, { useState, useRef, useEffect } from 'react';
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
    DatePicker, Card

} from "antd";
import QRCode from 'qrcode';
import axios from "axios";
import { appURLs, webAPI } from "../enums/urls";

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Header, Content } = Layout;

/* global jsQR */

const QRCodeReader = ({ isDarkMode }) => {
    const [form] = Form.useForm();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [scanning, setScanning] = useState(false);
    const [scannedCodes, setScannedCodes] = useState([]);
    const [isCameraOpen, setIsCameraOpen] = useState(false); // New state to track if the camera is open
    const [bookingItems, setBookingItems] = useState([]);
    const [bookingItemLovData, setBookingItemLovData] = useState([]);
    const [selectedBoking, setSelectedBoking] = useState({});

    useEffect(() => {
        let videoStream;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const handleSuccess = (stream) => {
            video.srcObject = stream;
            videoStream = stream;

            const track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);

            const scanQRCode = async () => {
                try {
                    const bitmap = await imageCapture.grabFrame();
                    canvas.width = bitmap.width;
                    canvas.height = bitmap.height;
                    context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);

                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = await readQRCode(imageData);

                    if (code && code.data) {
                        setScannedCodes((prevCodes) => {
                            const uniqueCodesSet = new Set(prevCodes);

                            if (!uniqueCodesSet.has(code.data)) {
                                uniqueCodesSet.add(code.data);
                                return [...uniqueCodesSet];
                            }

                            return prevCodes;
                        });
                    }

                    if (scanning) {
                        requestAnimationFrame(scanQRCode);
                    }
                } catch (error) {
                    console.error('Error grabbing frame:', error);
                }
            };

            scanQRCode();
        };

        const handleError = (error) => {
            console.error('Error accessing camera:', error);
        };

        const stopCamera = () => {
            if (videoStream) {
                videoStream.getTracks().forEach((track) => track.stop());
            }
        };

        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(handleSuccess)
            .catch(handleError);

        return () => {
            stopCamera();
        };
    }, [scanning]);

    const readQRCode = async (imageData) => {
        try {
            if (imageData.data && imageData.width && imageData.height) {
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                return code;
            } else {
                console.error('Invalid imageData:', imageData);
                return null;
            }
        } catch (error) {
            console.error('Error decoding QR code:', error);
            return null;
        }
    };

    const startCamera = () => {
        setIsCameraOpen(true);
        setScanning(true);
    };

    const stopCamera = () => {
        setIsCameraOpen(false);
        setScanning(false);

        // Pause the video
        const video = videoRef.current;
        if (video) {
            video.pause();
        }

        // Stop and release the video stream tracks
        const tracks = video?.srcObject?.getTracks();
        if (tracks) {
            tracks.forEach((track) => track.stop());
        }
    };

    const createLovData = (data) => {


        let itemList = [];
        if (data) {
            data.map(obj => {
                let data = {
                    label: obj.bookingName,
                    value: obj._id
                }
                itemList.push(data)
            })
        }
        console.log(itemList)
        setBookingItemLovData(itemList);

    }


    const getAllBooking = () => {

        axios.get(appURLs.web + webAPI.getallBookingDetails).then((res) => {
            setBookingItems(res.data.data);
            createLovData(res.data.data);
        })


    }

    useEffect(() => {
        getAllBooking();
    }, []);


    const handleItemSelect = (item) => {

        const itemData = bookingItems.find(data => data._id === item);
        console.log(itemData)
        setSelectedBoking(itemData);

    };


    const onClickCheck = () => {
        console.log("sel",selectedBoking)
        const itemListValues = selectedBoking?.itemList.map(item => item.value);
      
        const isTally = scannedCodes.every(code => itemListValues.includes(code));
      
        if (isTally) {
          // All scanned codes are present in the itemList values
          console.log('Tally!');
          alert('Tally!')
        } else {
          // Some scanned codes are not present in the itemList values
          console.log('Not tally!');
          alert('Not tally!')
        }
      };
   

    return (
        <>
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


                <Row >
                    <Col lg={20}>

                        <Form
                            form={form}
                            name="pdfUploadForm"
                            onFinish={(values) => { }}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            layout="vertical"
                        >

                            {/* Item Selection */}


                            <Item
                                label="Select Item"
                                name="selectedItem"
                                rules={[
                                    { required: true, message: "Please select an item!" },
                                ]}
                            >
                                <Select onSelect={handleItemSelect} options={bookingItemLovData} style={{ width: '100%' }} />


                            </Item>


                        </Form>
                    </Col>

                    <Col lg={4}>

                       
                            {/* Item Selection */}


                             <Button style={{marginTop:'29px',marginLeft:'20px'}}  onClick={onClickCheck}>Check</Button>


                          


                     
                    </Col>
                </Row>

                <Row justify="center" style={{ minHeight: '100vh' }}>
                    <Col span={12}>
                        <Card title={<strong>Scanned QR Codes:</strong>}>
                            <ul>
                                {scannedCodes.map((code, index) => (
                                    <li key={index}>{code}</li>
                                ))}
                            </ul>
                        </Card>
                    </Col>

                    {isCameraOpen ? scanning && (
                        <Col span={12}>
                            <Card>
                                <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
                            </Card>
                        </Col>
                    ) :
                        <Button type="primary" onClick={startCamera}>
                            Start Camera
                        </Button>}

                    <Col span={24}>
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </Col>

                    {isCameraOpen && (
                        <Col span={24}>
                            <Button type="danger" onClick={stopCamera}>
                                Stop Camera
                            </Button>
                        </Col>
                    )}
                </Row></Content></>
    );
};

export default QRCodeReader;
