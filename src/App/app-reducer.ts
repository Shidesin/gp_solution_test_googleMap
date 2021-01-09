import {createSlice} from '@reduxjs/toolkit';


export enum loadStatus {
    loadingOn = 'Loading start',
    loadingOff = 'Loading finish',
    loadingError = 'Loading error',
}

const initialState: initialStateType = {
    loading: loadStatus.loadingOn,
    data: []
}

const slice = createSlice({
    name: 'app-reducer',
    initialState: initialState,
    reducers: {
        loadData(state, action) {
            state.loading = action.payload
        },
        setState(state, action) {
            state.data = action.payload
        },
    }
})

export const {loadData,setState} = slice.actions;

export const appReducer = slice.reducer


type initialStateType = {
    loading: loadStatus
    data:  [] | stoppingPointType[]
}

type stoppingPointType = {
    name: string
    lng: string
    lat: string
}