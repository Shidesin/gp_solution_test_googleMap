import {createSlice} from '@reduxjs/toolkit';

export enum loadStatus {
    loadingOn = 'Loading start',
    loadingOff = 'Loading finish',
    loadingError = 'Loading error',
}

const initialState: initialStateType = {
    loading: loadStatus.loadingOn,
    dataStops: [],
    dataRoutes: [],
    searchWord: '',
    currentRouteCoordinate: null
}

const slice = createSlice({
    name: 'app-reducer',
    initialState: initialState,
    reducers: {
        loadData(state, action) {
            state.loading = action.payload
        },
        setStateStops(state, action) {
            state.dataStops = action.payload
        },
        setStateRoutes(state, action) {
            state.dataRoutes = action.payload
        },
        setSearchWord(state, action){
            state.searchWord = action.payload
        },
        setcurrentRouteCoordinate(state, action){
            state.currentRouteCoordinate = action.payload
        }
    }
})

export const {loadData, setStateStops, setStateRoutes, setSearchWord, setcurrentRouteCoordinate} = slice.actions;

export const appReducer = slice.reducer


type initialStateType = {
    loading: loadStatus
    dataStops: [] | stopsPointType[]
    dataRoutes: [] | routesType[]
    searchWord: string
    currentRouteCoordinate: stopsPointType[] | null
}

export type stopsPointType = {
    name: string
    lng: number
    lat: number
    id: string
}

export type routesType = {
    routeNum: string,
    transport: string,
    operator: string,
    validityPeriods: string[] | string,
    routeTag: string,
    routeType: string,
    routeName: string,
    weekdays: string,
    routeID: string,
    routeStops: string[]
}