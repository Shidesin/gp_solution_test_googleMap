import {Dispatch} from '@reduxjs/toolkit';
import {loadData, loadStatus, setState} from '../App/app-reducer';
import {changeEmptyName, refactorDataToArray} from '../StopPoint/spotPoint';


export const fetchData = (str: string)  =>  (dispatch: Dispatch)  => {
    dispatch(loadData(loadStatus.loadingOn))
    try {
        let dataRefactor = refactorDataToArray(str)
        let validData = changeEmptyName(dataRefactor)
        dispatch(setState(validData))
        dispatch(loadData(loadStatus.loadingOff))
    } catch (e) {
        console.log(e)
        dispatch(loadData(loadStatus.loadingError))
    }
}


// export const fetchData = ()  => async (dispatch: Dispatch)  => {
//     try {
//         let response = await fetch('https://cors-anywhere.herokuapp.com/http://www.minsktrans.by/city/minsk/stops.txt');
//         let responseData = await response.text()
//         let dataRefactor = refactorDataToArray(responseData)
//         let validData = changeEmptyName(dataRefactor)
//         dispatch(setState(validData))
//     } catch (e) {
//         console.log(e)
//     }
// }



