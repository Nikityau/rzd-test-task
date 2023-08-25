import {RZDPathSector} from "./route-data";
import {Train} from "./train-data";

export interface BusyPath {
    path: RZDPathSector,
    train: Train
}