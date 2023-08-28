import {useState} from "react";
import {IPathSector, PZDCPathSector} from "../ui/rzd";
import {RZDGraph} from "../data/data";
import produce from "immer";

export const useGraphBuild = () => {
    const [dGraph, setDGraph] = useState<PZDCPathSector[]>([])

    const build = (graph: RZDGraph): void => {
        if(graph == null) return

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

    return {
        dGraph,
        build,
        onBuild
    }
}