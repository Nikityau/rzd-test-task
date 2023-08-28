import React from 'react';
import {useRzd} from "../helpers/useRzd";

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

export const RzdContext = React.createContext(null)

const Rzd = () => {
    const {draw, dGraph, busyPath} = useRzd()

    return (
        <RzdContext.Provider value={{
            busyPath
        }}>
            <div className={'rzd'}>
                <div className={'rzd-container'}>
                    {
                        draw(dGraph)
                    }
                </div>
            </div>
        </RzdContext.Provider>
    );
};

export default Rzd;