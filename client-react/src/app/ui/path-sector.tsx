import React, {useEffect, useRef, useState} from 'react';
import {IPathSector, PZDCPathSector} from "./rzd";

type PathSectorProps = {
    obj: PZDCPathSector,
    onBuild: (obj: IPathSector) => void
}

const AddonCoordOffset = {
    X: 50,
    Y: 88
}

const PathSector = ({obj, onBuild}: PathSectorProps) => {

    const ref = useRef<HTMLDivElement>()

    useEffect(() => {
        const c = ref.current

        let y = obj.dependOn?.y || 0
        let x = (obj.dependOn?.x || 0) + c.clientWidth

        if (obj.node.rotate) {
            if (obj.node.rotate > 0) {
                y = AddonCoordOffset.Y
            } else {
                y = -AddonCoordOffset.Y

            }
        }

        onBuild({
            id: obj.node.id,
            rotate: obj.node.rotate,
            y,
            x,
            isBuild: true,
            uname: obj.node.uname
        })
    }, [])

    const getTopOffset = () => {
        return obj.dependOn?.y || 0
    }

    const getLeftOffset = () => {
        if (obj.dependOn && obj.dependOn.rotate) {
            if (obj.dependOn.rotate != 0) {
               return obj.dependOn?.x - AddonCoordOffset.X
            }
        }

        if(obj.dependOn?.y && obj.dependOn.y != 0) {
            return obj.dependOn?.x - AddonCoordOffset.X
        }

        return obj.dependOn?.x || 0
    }

    return (
        <div
            className={'path-sector'} ref={ref}
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