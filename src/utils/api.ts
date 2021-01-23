import {Dispatch} from 'redux';
import axios from 'axios';
import {loadData, loadStatus, setState} from '../App/app-reducer';

const instance = axios.create({
    baseURL: `http://localhost:8000/`,
});

export const API = {
    getDataStoppingPoints() {
        return instance.get(`stops`)
    }
}

export const fetchData = () => (dispatch: Dispatch) => {
    debugger
    dispatch(loadData(loadStatus.loadingOn))
    API.getDataStoppingPoints().then(res => {
        dispatch(setState(res.data))
        setTimeout(() => dispatch(loadData(loadStatus.loadingOff)),2000)
    }).catch(e => {
        console.log(e)
        dispatch(loadData(loadStatus.loadingError))
    })
}


