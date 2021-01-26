import {Dispatch} from 'redux';
import axios from 'axios';
import {loadData, loadStatus, setStateStops, setStateRoutes} from '../App';

const instance = axios.create({
    baseURL: `http://localhost:8000/`,
});

export const API = {
    getStoppingPoints() {
        return instance.get(`stops/`)
    },
    getRoutes() {
        return instance.get(`routes/`)
    }
}

export const fetchDataStopsPoint = () => async (dispatch: Dispatch) => {
    try {
        let response = await API.getStoppingPoints();
        if (response.status === 200) {
            dispatch(setStateStops(response.data))
        }
    } catch (e) {
        console.log(e)
        dispatch(loadData(loadStatus.loadingError))
        throw new Error(e)
    }
}

export const fetchDataRoutes = () => async (dispatch: Dispatch) => {
    try {
        let response = await API.getRoutes();
        if (response.status === 200) {
            dispatch(setStateRoutes(response.data))
        }
    } catch (e) {
        console.log(e)
        dispatch(loadData(loadStatus.loadingError))
        throw new Error(e)
    }
}


