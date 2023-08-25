"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainWatcher = exports.RailwayWatcher = void 0;
const uuid_1 = require("uuid");
const immer_1 = require("immer");
const route_data_1 = require("./route-data");
const train_data_1 = require("./train-data");
const random = (start, end) => {
    return Math.ceil(Math.random() * end - start);
};
class TrainBuilder {
    constructor() {
        this.train = null;
    }
    checkOnCreate() {
        if (this.train == null) {
            this.train = {
                id: (0, uuid_1.v4)(),
                numOfWagons: 1,
                trainName: null,
                trainUNumber: null
            };
        }
    }
    setId(id) {
        this.checkOnCreate();
        this.train.id = id;
        return this;
    }
    setNumOfWagon(num) {
        this.checkOnCreate();
        this.train.numOfWagons = num;
        return this;
    }
    setTrainUNumber(unumber) {
        this.checkOnCreate();
        this.train.trainUNumber = unumber;
        return this;
    }
    setTrainName(name) {
        this.checkOnCreate();
        this.train.trainName = name;
        return this;
    }
    build() {
        this.checkOnCreate();
        return this.train;
    }
}
class RailwayWatcher {
    constructor() {
        this.trainWatcher = new TrainWatcher();
        this.trainBuilder = new TrainBuilder();
        this.trainQueue = [];
        this.nextTrain = this.nextTrain.bind(this);
        this.trainWatcher.cbTrainExit = this.nextTrain;
    }
    nextTrain() {
        const train = this.trainQueue.shift();
        this.trainWatcher.setTrain(train);
    }
    generateTrain() {
        if (this.trainQueue.length >= 5)
            return;
        this.trainQueue.push({
            id: (0, uuid_1.v4)(),
            trainName: "Eagle",
            trainUNumber: "A232",
            numOfWagons: random(0, 4)
        });
    }
    watch() {
        this.trainWatcher.watch();
        setInterval(() => {
            this.generateTrain();
        }, 10000);
    }
}
exports.RailwayWatcher = RailwayWatcher;
class TrainWatcher {
    constructor() {
        this.routes = route_data_1.dataGraph.pathGraph;
        this.train = train_data_1.train;
        this.trainPath = [];
        this.busyPath = [];
        this.cbTrainExit = null;
    }
    setTrain(train) {
        this.train = train;
    }
    next(point) {
        if (this.train == null) {
            return '0';
        }
        if (point == "train exit")
            return null;
        if (point == "on exit") {
            return this.onExitTrain();
        }
        const routes = this.routes[point];
        let nextPoint = null;
        let routeNum = 0;
        let route = null;
        if (routes.length > 1) {
            routeNum = random(0, routes.length - 1);
        }
        else if (routes.length == 1) {
            routeNum = 0;
        }
        else {
            return this.onExitTrain();
        }
        route = routes[routeNum];
        this.trainPath.push(route);
        this.checkBusyPath();
        nextPoint = route.pointName;
        console.log('------------------------');
        console.log('next point', nextPoint);
        console.log('train path', this.trainPath);
        console.log('busy path', this.busyPath);
        console.log('-------------------------');
        return nextPoint;
    }
    clearInfo() {
        this.train = null;
        this.trainPath = [];
        this.busyPath = [];
    }
    onExitTrain() {
        this.busyPath = (0, immer_1.produce)(this.busyPath, draft => {
            const temp = this.busyPath;
            draft = [];
            for (let i = 0; i < temp.length - 1; ++i) {
                draft.push(temp[i]);
            }
            return draft;
        });
        if (this.busyPath.length == 0) {
            this.clearInfo();
            if (this.cbTrainExit) {
                this.cbTrainExit();
            }
            return "train exit";
        }
        return "on exit";
    }
    checkBusyPath() {
        if (this.trainPath.length <= this.train.numOfWagons) {
            this.busyPath = (0, immer_1.produce)(this.busyPath, draft => {
                draft = [];
                for (let i = 0; i < this.trainPath.length; ++i) {
                    draft.push({
                        train: this.train,
                        path: this.trainPath[i]
                    });
                }
                return draft;
            });
        }
        else {
            this.busyPath = (0, immer_1.produce)(this.busyPath, draft => {
                draft = [];
                const temp = (0, immer_1.produce)(this.trainPath, draft => {
                    return draft.reverse();
                });
                for (let i = 0; i < this.train.numOfWagons; ++i) {
                    draft.push({
                        train: this.train,
                        path: temp[i]
                    });
                }
                return draft;
            });
        }
    }
    watch() {
        let nextPoint = '0';
        setInterval(() => {
            nextPoint = this.next(nextPoint);
            if (nextPoint == null) {
                nextPoint = '0';
            }
        }, 2000);
    }
}
exports.TrainWatcher = TrainWatcher;
