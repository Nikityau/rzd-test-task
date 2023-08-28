import {useEffect, useState} from "react";
import {io} from 'socket.io-client'
import {RZDGraph} from "../data/data";

interface Train {
    id: string,
    trainUNumber: string
    trainName: string,
    numOfWagons: number
}

export interface RZDPathSector {
    id: string,
    pointName: string,
    sectorName?: string,
    rotate?: number
}

export interface BusyPath {
    path: RZDPathSector,
    train: Train
}

interface WssData {
    data: {
        route: RZDGraph,
        train: Train,
        trainPath: RZDPathSector[],
        busyPath: BusyPath[]
    }
}

export const useRzdWss = () => {
    const [data, setData] = useState<WssData>(null)

    useEffect(() => {
        const wss = io("http://localhost:4000")

        wss.on('railway', (args) => {
            setData(args)
        })

        return () => {
            wss.disconnect()
        }
    }, [])

    return {
        data
    }
}