import {createSlice} from '@reduxjs/toolkit';


export enum loadStatus {
    loadingOn = 'Loading start',
    loadingOff = 'Loading finish',
    loadingError = 'Loading error',
}

const initialState: initialStateType = {
    loading: loadStatus.loadingOn,
    data: [],
    showMenu: false
}

const slice = createSlice({
    name: 'app-reducer',
    initialState: initialState,
    reducers: {
        loadData(state, action) {
            state.loading = action.payload
        },
        setState(state, action) {
            debugger
            state.data = action.payload
        },
        showMenu(state, action) {
            state.showMenu = action.payload
        }
    }
})

export const {loadData, setState, showMenu} = slice.actions;

export const appReducer = slice.reducer


type initialStateType = {
    loading: loadStatus
    data: [] | stoppingPointType[]
    showMenu: boolean
}

type stoppingPointType = {
    name: string
    lng: number
    lat: number
    id: string
}