import {v4} from "uuid";
import {produce} from "immer";
import {dataGraph, RZDGraph, RZDPathSector} from "./route-data";
import {Train, train} from "./train-data";
import {BusyPath} from "./busy-path";

const random = (start: number, end: number) => {
    return Math.ceil(Math.random() * end - start)
}

class TrainBuilder {
    train: Train = null

    private checkOnCreate() {
        if(this.train == null) {
            this.train = {
                id: v4(),
                numOfWagons: 1,
                trainName: null,
                trainUNumber: null
            }
        }
    }

    setId(id: string) {
        this.checkOnCreate()

        this.train.id = id

        return this
    }

    setNumOfWagon(num: number) {
        this.checkOnCreate()

        this.train.numOfWagons = num

        return this
    }

    setTrainUNumber(unumber: string) {
        this.checkOnCreate()

        this.train.trainUNumber = unumber

        return this
    }

    setTrainName(name: string) {
        this.checkOnCreate()

        this.train.trainName = name

        return this
    }

    build() {
        this.checkOnCreate()

        return this.train
    }
}

export class RailwayWatcher {
    private trainWatcher: TrainWatcher = new TrainWatcher()
    private trainBuilder: TrainBuilder = new TrainBuilder()
    private trainQueue: Train[] = []

    constructor() {
        this.nextTrain = this.nextTrain.bind(this)

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

export class TrainWatcher {
    private routes: RZDGraph = dataGraph.pathGraph
    private train: Train = train
    private trainPath: RZDPathSector[] = []
    private busyPath: BusyPath[] = []

    cbTrainExit = null
    setTrain(train: Train) {
        this.train = train
    }

    private next(point: string): string {
        if (this.train == null) {
            return '0'
        }

        if (point == "train exit") return null
        if (point == "on exit") {
            return this.onExitTrain()
        }

        const routes = this.routes[point]

        let nextPoint = null

        let routeNum = 0
        let route: RZDPathSector = null

        if (routes.length > 1) {
            routeNum = random(0, routes.length - 1)
        } else if (routes.length == 1) {
            routeNum = 0
        } else {
            return this.onExitTrain()
        }

        route = routes[routeNum]
        this.trainPath.push(route)
        this.checkBusyPath()
        nextPoint = route.pointName

        console.log('------------------------')
        console.log('next point', nextPoint)
        console.log('train path', this.trainPath)
        console.log('busy path', this.busyPath)
        console.log('-------------------------')

        return nextPoint
    }

    private clearInfo() {
        this.train = null
        this.trainPath = []
        this.busyPath = []
    }

    private onExitTrain() {
        this.busyPath = produce(this.busyPath, draft => {
            const temp = this.busyPath
            draft = []

            for (let i = 0; i < temp.length - 1; ++i) {
                draft.push(temp[i])
            }

            return draft
        })

        if (this.busyPath.length == 0) {
            this.clearInfo()

            if(this.cbTrainExit) {
                this.cbTrainExit()
            }

            return "train exit"
        }

        return "on exit"
    }

    private checkBusyPath() {
        if (this.trainPath.length <= this.train.numOfWagons) {
            this.busyPath = produce(this.busyPath, draft => {
                draft = []

                for (let i = 0; i < this.trainPath.length; ++i) {
                    draft.push({
                        train: this.train,
                        path: this.trainPath[i]
                    })
                }

                return draft
            })
        } else {
            this.busyPath = produce(this.busyPath, draft => {
                draft = []

                const temp = produce(this.trainPath, draft => {
                    return draft.reverse()
                })
                for (let i = 0; i < this.train.numOfWagons; ++i) {
                    draft.push({
                        train: this.train,
                        path: temp[i]
                    })
                }

                return draft
            })
        }
    }

    watch() {
        let nextPoint = '0'
        setInterval(() => {
            nextPoint = this.next(nextPoint)

            if (nextPoint == null) {
                nextPoint = '0'
            }
        }, 2000)
    }
}