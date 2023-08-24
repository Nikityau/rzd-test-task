import {v4} from "uuid";

interface Sector {
    sectorId: string,
    sectorName: string,
    rotate?: number
}

interface RZDPath {
    id: string,
    pointName: string,
    sectorName?: string,
    rotate?: number
}

export interface RZDGraph {
    [name: string]: RZDPath[]
}

interface RZDPathGraph {
    pathGraph: RZDGraph
}

export const dataGraph: RZDPathGraph = {
    pathGraph: {
        "0": [
            {
                id: v4(),
                pointName: "s1"
            }
        ],
        "s1": [
            {
                id: v4(),
                pointName: "s2",
            },
            {
                id: v4(),
                pointName: "u0",
                rotate: -60
            },
            {
                id: v4(),
                pointName: "b1",
                rotate: 60
            }
        ],
        "b1": [
            {
                id: v4(),
                pointName: "b2"
            }
        ],
        "b2": [
            {
                id: v4(),
                pointName: "b3",
                rotate: -60
            }
        ],
        "b3": [],
        "u0": [
            {
                id: v4(),
                pointName: "u1",
            }
        ],
        "u1": [
            {
                id: v4(),
                pointName: "u2"
            }
        ],
        "u2": [
            {
                id: v4(),
                pointName: "u3",
                rotate: 60
            }
        ],
        "u3": [],
        "s2": [
            {
                id: v4(),
                pointName: "s3",
            }
        ],
        "s3": [
            {
                id: v4(),
                pointName: "s4"
            }
        ],
        "s4": [
            {
                id: v4(),
                pointName: "s5"
            },
        ],
        "s5": [
            {
                id: v4(),
                pointName: "s6",
            }
        ],
        "s6": [
            {
                id: v4(),
                pointName: "s7"
            },
            {
                id: v4(),
                pointName: "u21",
                rotate: -60
            }
        ],
        "s7": [],
        "u21": [
            {
                id: v4(),
                pointName: "u22"
            }
        ],
        "u22": []
    }
}