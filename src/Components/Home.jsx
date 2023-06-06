import React from "react";
import "./Home.css";
import { useState } from "react";
import {
  ref,
  uploadBytes
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Report from "./Report";
// import Footer from "./footer";

function Upload() {
  const [fileUpload, setFileUpload] = useState(null);

  const uploadFile = () => {
    if (fileUpload == null) return;
    const imageRef = ref(storage, `FilesUploaded/ ${fileUpload.name + v4()}`);
    uploadBytes(imageRef, fileUpload).then(() => {
      alert("Files Uploaded Successfully")
    });
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Files</button>
    </div>
  );
}

const Home = () => {
  return (
    <>
      <div>
        <div className="nav">
          <h1 className="homeHead">
            <span id="spanId">F</span>-UPLOAD
          </h1>
          <p className="para">Log In</p>
        </div>
        <div className="mainPage">
          <img src="Upload-amico.png" alt="" />
          <div className="mainHead">
            <h1>Upload code, Access them easily</h1>
            <h2>(Upload files in word/txt/pdf format)</h2>
            <hr />
            <Upload />
          </div>
          <div className="showReport">
            <Report />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
