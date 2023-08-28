import React, {useEffect, useState} from "react";
import equal from 'deep-equal'
import {dataGraph, RZDGraph} from "../data/data";
import {useDrawPath} from "./useDrawPath";
import {useGraphBuild} from "./useGraphBuild";
import {BusyPath, RZDPathSector, useRzdWss} from "./useRzdWss";

interface useRzdRet {
    dGraph: RZDPathSector[]
}

export const useRzd = () => {
    const {data} = useRzdWss()
    const [path, setPath] = useState<RZDGraph | null>(data?.data.route || null)
    const [busyPath, setBusyPath] = useState<BusyPath[]>(null)
    const {dGraph, onBuild, build} = useGraphBuild()
    const draw = useDrawPath({onBuild})


    useEffect(() => {
        build(path)
    }, [path])

    useEffect(() => {
        console.log(data?.data)
        const route = data?.data.route || null


        if (!equal(
            path,
            route
        )) {
            setPath(route)

        }

    }, [data])

    useEffect(() => {
        const busy = data?.data.busyPath || null

        if(
            !equal(
                busy,
                busyPath
            )
        ) {
            setBusyPath(busy)
        }

    }, [data])

    return {
        busyPath,
        dGraph,
        draw
    }
}