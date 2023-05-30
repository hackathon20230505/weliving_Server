import http2 from "http2";
import fs from "fs";
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pemPath = path.join(__dirname, '230502.pem');

const options = {
    key: fs.readFileSync(pemPath),
    cert: fs.readFileSync(pemPath)
};


export const server = http2.createServer(options, app);


export default server;