import React, {useEffect} from 'react';
import './App.css';
import {fetchData} from '../utils/api';
import {useDispatch} from 'react-redux';
import {localInitialState} from '../redux/initialState';
import { MapBoxContainer } from '../Map';


function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchData(localInitialState))
    }, [])

    return (
        <div>
            {/*<MapBoxContainer />*/}

        </div>
    );
}

export default App;
