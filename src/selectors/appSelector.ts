import {AppRootStateType} from '../redux/store';
import {createSelector} from '@reduxjs/toolkit';


const getDataBreakpoint = (state: AppRootStateType) => {
    return state.app.data
}

const showMenu = (state: AppRootStateType) => {
    return state.app.showMenu
}

const getLoading = (state: AppRootStateType) => {
    return state.app.loading
}

export const getBreakPoints = createSelector([getDataBreakpoint], (state) => {
    return state.filter( obj => obj.name.length > 3)
})

export const showMenuSelector = createSelector([showMenu], (state) => {
    return state
})

export const loaderSelector = createSelector([getLoading],state => {
    return state
} )
