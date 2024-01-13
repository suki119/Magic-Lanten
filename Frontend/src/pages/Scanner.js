// import React, { useEffect, useState, useRef } from 'react';
// import QrReader from 'react-qr-reader';
// import {
//   Breadcrumb,
//   Layout,
//   Divider,
//   Row,
//   Col,
//   Form,
//   Input,
//   Select,
//   Button,
//   DatePicker,Card
 
// } from "antd";
// import QRCode from 'qrcode';
// import axios from "axios";
// import { appURLs, webAPI } from "../enums/urls";

// const { Item } = Form;
// const { Option } = Select;
// const { TextArea } = Input;
// const { Header, Content } = Layout;

// const Scanner = () => {
//   const [form] = Form.useForm();
//   const [text, setText] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [scanResultFile, setScanResultFile] = useState('');
//   const [scanResultWebCam, setScanResultWebCam] = useState('');
//   const [scanResultsWebCam, setScanResultsWebCam] = useState([]);
//   const qrRef = useRef(null);
//   const [isCameraOpen, setIsCameraOpen] = useState(false); // New state to track if the camera is open
//   const [data, setData] = useState('No result');
//   const [bookingItems, setBookingItems] = useState([]);
//   const [bookingItemLovData, setBookingItemLovData] = useState([]);

//   const generateQrCode = async () => {
//     try {
//       const response = await QRCode.toDataURL(text);
//       setImageUrl(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleErrorFile = (error) => {
//     console.error(error);
//   };

//   const handleScanFile = (result) => {
//     if (result) {
//       setScanResultFile(result);
//     }
//   };

//   const onScanFile = () => {
//     qrRef.current.openImageDialog();
//   };

//   const handleErrorWebCam = (error) => {
//     console.error(error);
//   };

//   const handleScanWebCam = (result) => {
//     console.log("scan", result);
//     if (result && !scanResultsWebCam.includes(result)) {
//       setScanResultsWebCam((prevResults) => [...prevResults, result]);
//     }
//     setScanResultWebCam(result);
//   };

//   const startCamera = () => {
//     setIsCameraOpen(true);
//   };

//   const createLovData = (data) => {


//     let itemList = [];
//     if (data) {
//       data.map(obj => {
//         let data = {
//           label: obj.ItemName,
//           value: obj._id
//         }
//         itemList.push(data)
//       })
//     }
//     console.log(itemList)
//     setBookingItemLovData(itemList);

//   }


//   const getAllBooking = () => {

//     axios.get(appURLs.web + webAPI.getallBookingDetails).then((res) => {
//       setBookingItems(res.data.data);
//       createLovData(res.data.data);
//     })


//   }

//   useEffect(() => {
//     getAllBooking();
//   }, []);


//   const handleItemSelect = (item) => {
        
   
    
// };




//   return (
//     <div style={{ margin: '10px' }}>
//       <Card title="Generate Download & Scan QR Code with React JS">
//         <Row gutter={16}>
//           <Form
//             form={form}
//             name="pdfUploadForm"
//             onFinish={(values) => {}}
//             labelCol={{ span: 24 }}
//             wrapperCol={{ span: 24 }}
//             layout="vertical"
//           >

//             {/* Item Selection */}
//             <Row gutter={16}>
//               <Col lg={12} xs={24}>
//                 <Item
//                   label="Select Item"
//                   name="selectedItem"
//                   rules={[
//                     { required: true, message: "Please select an item!" },
//                   ]}
//                 >
//                   <Select onSelect={handleItemSelect} options={bookingItemLovData} />


//                 </Item>
//               </Col>
//             </Row>
//           </Form>
//         </Row>
//         <Row gutter={16}>
//           <Col span={8}>
//             <h3>QR Code Scan by Web Cam</h3>
//             {isCameraOpen ? (
//               <>
//                 <QrReader
//                   onResult={(result, error) => {
//                     if (!!result) {
//                       setData(result?.text);
//                     }

//                     if (!!error) {
//                       console.info(error);
//                     }
//                   }}
//                   style={{ width: '100%' }}
//                 />
//                 <p>{data}</p>
//               </>
//             ) : (
//               <Button type="primary" onClick={startCamera}>
//                 Start Camera
//               </Button>
//             )}
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default Scanner;
