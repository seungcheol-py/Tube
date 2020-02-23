import dotenv from "dotenv";
dotenv.config();

import "./db";
import app from "./app";

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT;

const handleListening = () => console.log(`Listening on ${PORT}`);

app.listen(PORT, handleListening);
