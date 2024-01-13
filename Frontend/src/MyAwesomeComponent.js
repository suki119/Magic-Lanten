import React from "react";
import Scanner from "react-webcam-qr-scanner";

const  MyAwesomeComponent = (props) => {

  const handleDecode = (result) => {
    console.log(result);
  } 

  const handleScannerLoad = (mode) => {
    console.log(mode);
  }

  return (
    <Scanner 
      className="some-classname"
      onDecode={handleDecode}
      onScannerLoad={handleScannerLoad}
      constraints={{ 
        audio: false, 
        video: { 
          facingMode: "environment" 
        } 
      }}
      captureSize={{ width: 1280, height: 720 }}
    />
  );
}

export default MyAwesomeComponent;