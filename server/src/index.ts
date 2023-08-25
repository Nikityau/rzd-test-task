import express, {Express} from 'express'
import * as process from "process";
import {RailwayWatcher, TrainWatcher} from "./rzd/train-watcher";

const app: Express = express()
const PORT = process.env['PORT'] || 5000;



app.listen(PORT, () => {
    console.log(`Server run on ${PORT} port`)

    const railway = new RailwayWatcher()
    railway.watch()
})