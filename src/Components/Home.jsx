import "./Home.css";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import Report from "./Report";
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");

  const uploadFile = async() => {
    if (!file){
      alert("Please select a file first");
      return;
    }

    const path = `FilesUploaded/${file.name + v4()}`;
    const fileRef = ref(storage, path);

    await uploadBytes(fileRef, file);
    setFilePath(path);

    const response = await axios.post("http://localhost:5000/analyze", {
      filePath: path
    })

    console.log("Backend response: ", response.data);
    
    alert("Files Uploaded Successfully");
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Files</button>

      {filePath && (
        <p>
          Upload Path: <b>{filePath}</b>
        </p>
        )}

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
