"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataGraph = void 0;
const uuid_1 = require("uuid");
exports.dataGraph = {
    pathGraph: {
        "0": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s1"
            }
        ],
        "s1": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s2",
            },
            {
                id: (0, uuid_1.v4)(),
                pointName: "u0",
                rotate: -60
            },
            {
                id: (0, uuid_1.v4)(),
                pointName: "b1",
                rotate: 60
            }
        ],
        "b1": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "b2"
            }
        ],
        "b2": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "b3",
                rotate: -60
            }
        ],
        "b3": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s4"
            }
        ],
        "u0": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "u1",
            }
        ],
        "u1": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "u2"
            }
        ],
        "u2": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "u3",
                rotate: 60
            }
        ],
        "u3": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s5"
            }
        ],
        "s2": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s3",
            }
        ],
        "s3": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s4"
            }
        ],
        "s4": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s5"
            },
        ],
        "s5": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s6",
            }
        ],
        "s6": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s7"
            },
            {
                id: (0, uuid_1.v4)(),
                pointName: "u21",
                rotate: -60
            }
        ],
        "u21": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "u22"
            }
        ],
        "s7": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s8",
                rotate: 60
            }
        ],
        "s8": [
            {
                id: (0, uuid_1.v4)(),
                pointName: "s9"
            }
        ],
        "s9": [],
        "u22": []
    }
};
