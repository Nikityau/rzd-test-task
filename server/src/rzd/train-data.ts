import {v4} from 'uuid'

export interface Train {
    id: string,
    trainUNumber: string
    trainName: string,
    numOfWagons: number
}

export const train: Train = {
    id: v4(),
    trainUNumber: "A128",
    trainName: "Sparrow",
    numOfWagons: 2
}