import React, {useContext, useEffect, useRef, useState} from 'react';
import cn from 'classnames'
import {IPathSector, PZDCPathSector, RzdContext} from "./rzd";
import {usePathSector} from "../helpers/usePathSector";

type PathSectorProps = {
    obj: PZDCPathSector,
    onBuild: (obj: IPathSector) => void
}

const PathSector = ({obj, onBuild}: PathSectorProps) => {

    const {ref, getLeftOffset, getTopOffset, isBusy} = usePathSector({obj, onBuild})
    const context = useContext(RzdContext)

    return (
        <div
            className={cn('path-sector', isBusy(context['busyPath']) ? 'path-sector_busy' : '')} ref={ref}
            data-sector-name={obj.node.uname}
            data-dependp-sector-name={obj.dependOn?.uname || null}
            style={{
                top: `${getTopOffset()}px`,
                left: `${getLeftOffset()}px`,
                transform: `
                rotate(${obj.node.rotate}deg)
                `
            }}
        >

        </div>
    );
};

export default PathSector;