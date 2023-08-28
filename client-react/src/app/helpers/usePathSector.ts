import {useEffect, useRef} from "react";
import {BusyPath} from "./useRzdWss";
import {IPathSector, PZDCPathSector} from "../ui/rzd";

const AddonCoordOffset = {
    X: 50,
    Y: 88
}


type usePathSectorProps = {
    obj: PZDCPathSector,
    onBuild: (obj: IPathSector) => void
}

export const usePathSector = ({obj, onBuild}: usePathSectorProps) => {
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

    const isBusy = (busy: BusyPath[]): boolean => {
        if(!busy) return false

        for(let i = 0; i < busy.length; ++i) {
            if(busy[i].path.pointName == obj.node.uname) {
                return true
            }
        }

        return false
    }

    return {
        ref,
        getLeftOffset,
        getTopOffset,
        isBusy
    }
}