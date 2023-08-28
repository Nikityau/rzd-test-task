import {IPathSector, PZDCPathSector} from "../ui/rzd";
import PathSector from "../ui/path-sector";
import React from "react";

type UseDrawPathProps = {
    onBuild: (obj: IPathSector) => any
}

export const useDrawPath = ({onBuild}:UseDrawPathProps) => {
    const draw = (graph: PZDCPathSector[]): JSX.Element[] => {
        const g: JSX.Element[] = []

        for (let i = 0; i < graph.length; ++i) {
            if ((graph[i].dependOn && graph[i].dependOn.isBuild) ||
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


    return draw
}