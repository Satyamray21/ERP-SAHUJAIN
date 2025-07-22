import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json(
    {
        limit: "10mb"
    }

))
app.use(express.urlencoded(
    {
        extended: true,
        limit: "10mb"
    }
))
app.use('/upload', express.static(path.join(__dirname, '/upload')));

app.use(cookieParser());

import personalInfoRouter from "./src/router/personalInfo.rotuer.js"
app.use("/api/v1/personalInfo",personalInfoRouter);
import candidateRegRouter from "./src/router/candidateReg.router.js";
app.use("/api/v1/candidate",candidateRegRouter);
export { app }