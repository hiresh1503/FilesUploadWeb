import express from 'express';
import cors from 'cors';
import bucket from "./firebase.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is Running");
});

app.post("/analyze", async (req, res) => {
    const { filePath } = req.body;

    try {
        console.log("Downloading file: ", filePath);

        const localFilePath = path.join(
            __dirname,
            "temp",
            path.basename(filePath)
        );

        if (!fs.existsSync(path.join(__dirname, "temp"))) {
            fs.mkdirSync(path.join(__dirname, "temp"));
        }

        await bucket.file(filePath).download({
            destination: localFilePath
        });

        console.log("File downloaded to: ", localFilePath);

        res.json({
            message: "File Downloaded successfully",
            localFilePath
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to download the file!!" })
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend is running at ${PORT}`);
});