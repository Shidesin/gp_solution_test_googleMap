import {AppRootStateType} from '../redux/store';
import {createSelector} from '@reduxjs/toolkit';


const getDataBreakpoint = (state: AppRootStateType) => {
    return state.app.data
}

export const getBreakPoints = createSelector([getDataBreakpoint], (state) => {
    return state.filter( obj => obj.name.length > 3)
})