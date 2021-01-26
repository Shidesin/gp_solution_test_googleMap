import {AppRootStateType} from '../redux/store';
import {createSelector} from '@reduxjs/toolkit';
import {routesType, stopsPointType} from '../App';

const getAllRoutes = (state: AppRootStateType) => {
    return state.app.dataRoutes
}

const getStopsPoint = (state: AppRootStateType) => {
    return state.app.dataStops
}

const getLoading = (state: AppRootStateType) => {
    return state.app.loading
}

const getSearchWord = (state: AppRootStateType) => {
    return state.app.searchWord
}

const getCurrentRouteCoordinate = (state: AppRootStateType) => {
    return state.app.currentRouteCoordinate
}

export const currentRouteCoordinateSelector = createSelector([getCurrentRouteCoordinate], (state) => {
    return state
})

export const SearchWordSelector = createSelector([getSearchWord], (state) => {
    return state
})

export const getBreakPoints = createSelector([getStopsPoint], (state) => {
    return state.filter(obj => obj.name !== 'приг.')
})

export const loaderSelector = createSelector([getLoading], state => {
    return state
})

export const searchRoutesSelector = createSelector([getAllRoutes, getStopsPoint, getSearchWord],
    (state, stopsPoint, searchWord) => {
        if (searchWord) {
            let result: routesType[] = []
            let searchStopPoint: stopsPointType[] = stopsPoint
                .filter((pointStop) => pointStop.name.toLowerCase().indexOf(searchWord.toLowerCase()) > -1);
            for (let i = 0; i < searchStopPoint.length; i++) {
                state.forEach((route) => {
                    if (route.routeStops.includes(searchStopPoint[i].id)) {
                        result.push(route)
                    }
                })
            }
            return result.sort((a, b) => +a.routeNum - +b.routeNum)
        } else {
            return state
        }
    })

