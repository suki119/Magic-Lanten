import React, { useState, useRef, useEffect } from 'react';
import { Card, Col, Row, Form, Radio, Slider, Input, Image, Divider, Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, SaveOutlined } from '@ant-design/icons'; // Import Ant Design icons
import maleAudioEnglish from '../../Audio/introduction_en_m.mp3';
import femaleAudioEnglish from '../../Audio/introduction_en_f.mp3';
import maleAudioSinhala from '../../Audio/introduction_sin_m.mp3';
import femaleAudioSinhala from '../../Audio/introduction_sin_f.mp3';
import { appURLs, webAPI } from '../../utils/api';
import Swal from 'sweetalert2'
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";


const { Group } = Radio;

function Configuration(props) {
    const history = useHistory();
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [audioPlaying, setAudioPlaying] = useState(false);
    const audioRef = useRef(null);
    const [commandSpeed, setCommandSpeed] = useState(1);
    const [selectedGender, setSelectedGender] = useState('m');
    const [user, setUser] = useState({});



    const [form] = Form.useForm();

    const playAudio = (audioId) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        const audio = new Audio(audioId);
        audio.playbackRate = commandSpeed;
        audio.play();
        setAudioPlaying(true);
        audioRef.current = audio;
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setAudioPlaying(false);
        }
    };

    const handleTestAudio = () => {
        let audioSource = selectedLanguage === 'en'
            ? (selectedGender === 'm' ? maleAudioEnglish : femaleAudioEnglish)
            : (selectedGender === 'm' ? maleAudioSinhala : femaleAudioSinhala);

        if (audioSource) {
            playAudio(audioSource);
        }
    };

    const handleSliderChange = (value) => {
        setCommandSpeed(value);
        if (audioPlaying && audioRef.current) {
            audioRef.current.playbackRate = value;
        }
    };

    const handleSave = (values) => {
        // Add code to save form data here
        console.log('Form data saved:', {
            selectedLanguage,
            selectedGender,
            commandSpeed,
            values
        });

        const data = {
            gender: selectedGender,
            language: selectedLanguage,
            commandSpeed: Number(commandSpeed),
            openApiKey: values.apiKey,
            product_id: user.productId
        }

        axios.post(appURLs.web + webAPI.addConfigarationDetails, data)
            .then((res) => {
                if (res.data.status) {
                    Swal.fire(
                        'Data Saved!',


                    );

                }
            })
            .catch((error) => {
                console.error("Error", error);

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Network Error',
                    showConfirmButton: false,
                    timer: 1500,
                    width: 10
                });
            });

    };


    const getProductData = (user) => {

        axios.get(appURLs.web + webAPI.getProductConfigarationByProductID + user.productId)
            .then((res) => {
                console.log("res", res.data.data[0])


                if (res.data.data[0]) {

                    setSelectedGender(res.data.data[0].gender)
                    setSelectedLanguage(res.data.data[0].language)
                    setCommandSpeed(res.data.data[0].commandSpeed)

                    const  initialFormData  = {
                        selectedLanguage: res.data.data[0].language,
                        selectedGender: res.data.data[0].gender,
                        commandSpeed: res.data.data[0].commandSpeed,
                        apiKey: res.data.data[0].openApiKey,
                    };
                    form.setFieldsValue(initialFormData );
                }
            })
            .catch((error) => {
                console.error("Error", error);

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Network Error',
                    showConfirmButton: false,
                    timer: 1500,
                    width: 10
                });
            });

    }


    useEffect(() => {
        const lUser = JSON.parse(localStorage.getItem("user"));
        if (lUser) {
            setUser(lUser);
            getProductData(lUser);
        }else{
            history.push(`/login`);
        }

    }, []);

    return (
        <div style={{ marginTop: '15px' }}>
            <Card title="Product Configuration ">
                <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form layout="horizontal" form={form} onFinish={handleSave} labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }} >
                            <div>
                                <Divider orientation="left" orientationMargin="0">Voice Configuration</Divider>
                                <div style={{ marginLeft: '25px' }}>
                                    <Form.Item name="selectedGender" label={<span style={{ fontWeight: '500' }}>Gender Selection</span>}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Group defaultValue="male" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} style={{ marginLeft: '15px' }}>
                                                <Radio value="m">Male</Radio>
                                                <Radio value="f">Female</Radio>
                                            </Group>
                                        </div>
                                    </Form.Item>
                                    <Form.Item label={<span style={{ fontWeight: '500' }}>Select Language</span>}>
                                        <Radio.Group value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} style={{ marginLeft: '19px' }}>
                                            <Radio value="sin">
                                                Sinhala
                                            </Radio>
                                            <Radio value="en">
                                                English
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item label={<span style={{ fontWeight: '500' }}>Command Speed</span>}>
                                        <Slider style={{ marginLeft: '19px' }}
                                            min={1} max={5} defaultValue={1} marks={{ 1: '1x', 1.5: '1.5x', 2: '2x', 2.5: '2.5x', 3: '3x', 3.5: '3.5x', 4: '4x', 4.5: '4.5x', 5: '5x' }} value={commandSpeed} onChange={handleSliderChange} />
                                    </Form.Item>
                                    <Form.Item label={<span style={{ fontWeight: '500' }}>Test the Audio</span>}>
                                        {!audioPlaying && (
                                            <Button
                                                style={{ marginLeft: '23px', backgroundColor:'#5b2f84', }}
                                                type="primary"
                                                icon={<PlayCircleOutlined />} // Use Ant Design's play icon
                                                onClick={handleTestAudio}
                                            >

                                            </Button>)}
                                        {audioPlaying && (
                                            <Button

                                                type="default" style={{
                                                    
                                                    marginLeft: '23px',
                                                    backgroundcolor: props.isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)',
                                                    color: props.isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)'

                                                }}
                                                icon={<PauseCircleOutlined />} // Use Ant Design's stop icon
                                                onClick={stopAudio}
                                            >

                                            </Button>
                                        )}
                                    </Form.Item>

                                </div>
                                <div>
                                </div>
                                <Divider orientation="left" orientationMargin="0">Open API Configuration</Divider>
                                <div style={{ marginLeft: '25px' }}>
                                    <Form.Item name="apiKey" label="API Key">
                                        <Input placeholder="Enter Open API Key" />
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item>
                                <Button
                                    style={{ marginTop: '20px',backgroundColor:'#5b2f84' }}
                                    type="primary" htmlType="submit"
                                    icon={<SaveOutlined />} // Use Ant Design's save icon

                                >
                                    Save Data
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <Image
                            width="100%"
                            src="https://res.cloudinary.com/colouration/image/upload/v1697965268/WhatsApp_Image_2023-09-06_at_10.21.01-removebg-preview_jypshd.png"
                            alt="Image"
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Configuration;
