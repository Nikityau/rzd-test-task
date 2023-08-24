import React, {useEffect, useState} from 'react';
import {dataGraph, RZDGraph} from "../data/data";
import PathSector from "./path-sector";
import produce from "immer";

export interface IPathSector {
    id: string,
    uname: string,
    isBuild: boolean,
    x: number,
    y: number,
    rotate?: number
}

export interface PZDCPathSector {
    node: IPathSector,
    dependOn: IPathSector | null
}

const Rzd = () => {

    const [path] = useState(dataGraph)
    const [dGraph, setDGraph] = useState<PZDCPathSector[]>([])

    const build = (graph: RZDGraph): void => {
        const queue = []
        const visited = {}

        const arr: PZDCPathSector[] = []

        queue.push('0')
        while (queue.length > 0) {
            const key = queue.shift()

            for (let el of graph[key]) {
                if (el.pointName in visited) {
                    continue
                } else {

                    const pzdc: PZDCPathSector = {
                        node: {
                            id: el.id,
                            uname: el.pointName,
                            x: null,
                            y: null,
                            rotate: el.rotate,
                            isBuild: false
                        },
                        dependOn: null
                    }

                    if (key != "0") {
                        const f = arr.find((el) => el.node.uname == key)

                        pzdc.dependOn = f.node
                    }

                    arr.push(pzdc)

                    queue.push(el.pointName)
                    visited[`${el.pointName}`] = true
                }
            }

        }

        setDGraph(arr)

        console.log(visited)
        console.log(arr)
    }

    const onBuild = (obj: IPathSector) => {
        setDGraph(prev => {
            return produce(prev, draft => {
                draft.forEach(d => {
                    if (d.node.id == obj.id) {
                        d.node = obj
                    }

                    if (d.dependOn && d.dependOn.id == obj.id) {
                        d.dependOn = obj
                    }

                    return d
                })

                return draft
            })
        })
    }

    const draw = (graph:PZDCPathSector[]): JSX.Element[] => {
        const g:JSX.Element[] = []

        for(let i = 0; i < graph.length; ++i) {
            if((graph[i].dependOn && graph[i].dependOn.isBuild) ||
                graph[i].dependOn == null
            ) {
                g.push((
                    <PathSector
                        key={graph[i].node.id}
                        obj={graph[i]}
                        onBuild={onBuild}
                    />
                ))
            }
        }

        return g
    }

    useEffect(() => {
        build(path.pathGraph)
    }, [])

    return (
        <div className={'rzd'}>
            <div className={'rzd-container'}>
                {
                    draw(dGraph)
                }
            </div>
        </div>
    );
};

export default Rzd;