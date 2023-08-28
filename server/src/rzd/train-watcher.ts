import {produce} from "immer";
import {dataGraph, RZDGraph, RZDPathSector} from "./route-data";
import {Train, train} from "./train-data";
import {BusyPath} from "./busy-path";
import {random} from "./helpers/random";
import {Logger} from "../logger/logger";


export class TrainWatcher {
    private routes: RZDGraph = dataGraph.pathGraph
    private train: Train = train
    private trainPath: RZDPathSector[] = []
    private busyPath: BusyPath[] = []

    cbTrainExit = null
    private onPathUpd: (any) => void

    constructor(onPathUpd: (any) => void) {
        this.onPathUpd = onPathUpd
    }

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

        Logger.log('------------------------')
        Logger.log('next point', nextPoint)
        Logger.log('train path', this.trainPath)
        Logger.log('busy path', this.busyPath)
        Logger.log('-------------------------')

        this.onPathUpd({
            route: this.routes,
            train: this.train,
            trainPath: this.trainPath,
            busyPath: this.busyPath
        })

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

        this.onPathUpd({
            route: this.routes,
            train: this.train,
            trainPath: this.trainPath,
            busyPath: this.busyPath
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