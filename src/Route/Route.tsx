import React from 'react';
import {routesType, setcurrentRouteCoordinate, stopsPointType} from '../App';
import style from './RouteContainer.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import {getBreakPoints} from '../selectors';


type propsType = {
    clearMarkersRoute: () => void
    routesType: routesType
}

export const Route: React.FC<propsType> = React.memo( ({routesType,clearMarkersRoute}) => {

    const {routeName, routeNum, routeStops} = routesType

    const arrayMarkers = useSelector<AppRootStateType, any>(getBreakPoints);

    const dispatch = useDispatch()

    const getArrayCoordCurrentRoute = (arrayAllStops: stopsPointType[], currentRouteStops: string[]) => {
        let arrayStopPoints: any = [];
        for (let i = 0; i < currentRouteStops.length; i++) {
            let currentStopPoint = arrayAllStops.find((stop) => {
                return  stop.id === currentRouteStops[i]
            })
            arrayStopPoints.push(currentStopPoint)
        }
        dispatch(setcurrentRouteCoordinate(arrayStopPoints))
    }

    const buttonHandler = () => {
        getArrayCoordCurrentRoute(arrayMarkers, routeStops )
        clearMarkersRoute()

    }

    return (
        <div onClick={buttonHandler} className={style.route_container}  >
            <div className={style.route_container__number}>{routeNum}</div>
            <div className={style.route_container__name}>{routeName}</div>
        </div>
    )
})