import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import mongoose, { Error } from "mongoose";
import cors from 'cors';
import http from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import router from "./router";

dotenv.config();
const port = process.env.PORT || 3000;

const app: Express = express();
app.use(cors({ credentials: true }))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)
server.listen(port, () => console.log(`port is listening on ${port}`));

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL!, {})
mongoose.connection.on('error', (error: Error) => {
    console.log(`mongo connecion failed: ${error}`)
})


router().map((element) => {
    app.use(element.route, element.router);
})

const home = (req: Request, res: Response) => {
    return res.status(200).send("Hello coder");
}

app.get('/', home);
