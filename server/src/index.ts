import 'dotenv/config'
import express, {Express} from 'express'
import {createServer} from 'http'
import {Server} from "socket.io";

import {TrainWatcher} from "./rzd/train-watcher";
import {RailwayWatcher} from "./rzd/railway-watcher";

const PORT = process.env['PORT'] || 4000;



class RZDServer {
    app: Express = null;
    httpServer = null;
    io: Server = null;

    railwayWatcher: RailwayWatcher = null;

    constructor() {
        this.app = express()
        this.httpServer = createServer(this.app)
        this.io = new Server(this.httpServer, {
            cors: {
                origin: "*"
            }
        })


        this.sendMessage = this.sendMessage.bind(this)

        this.railwayWatcher = new RailwayWatcher(
            new TrainWatcher(this.sendMessage)
        )
    }

    sendMessage(args) {
        this.io.emit('railway', { data: args })
    }


    start() {
        this.io.on('connection', (socket) => {
            socket.on('error', console.error)

            socket.on('message', (msg) => {
                console.log(msg)
            })
        })


        this.httpServer.listen(PORT, () => {
            console.log(`running on ${PORT} port`)

            this.railwayWatcher.watch()
        })
    }
}


const rzdServer = new RZDServer()
rzdServer.start()