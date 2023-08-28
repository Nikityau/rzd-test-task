import {Train} from "./train-data";
import {v4} from "uuid";
import {TrainWatcher} from "./train-watcher";
import {random} from "./helpers/random";

export class RailwayWatcher {
    private trainWatcher: TrainWatcher = null
    private trainQueue: Train[] = []

    constructor(trainWatcher: TrainWatcher) {
        this.nextTrain = this.nextTrain.bind(this)

        this.trainWatcher = trainWatcher
        this.trainWatcher.cbTrainExit = this.nextTrain
    }

    private nextTrain() {
        const train = this.trainQueue.shift()
        this.trainWatcher.setTrain(train)
    }

    private generateTrain() {
        if(this.trainQueue.length >= 5) return

        this.trainQueue.push({
            id: v4(),
            trainName: "Eagle",
            trainUNumber: "A232",
            numOfWagons: random(0, 4)
        })
    }

    watch() {
        this.trainWatcher.watch()
        setInterval(() => {
            this.generateTrain()
        }, 10000)
    }
}