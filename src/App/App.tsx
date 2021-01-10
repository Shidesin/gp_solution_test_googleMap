import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {localInitialState} from '../redux/initialState';
import {fetchData} from '../utils';
import Content from '../Content';
import styled from './App.module.css'
import {HeaderComponent} from '../Header';
import {FooterComponent} from '../Footer';



function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchData(localInitialState))
    }, [])

    return (
        <BrowserRouter>
            <div className={styled.main_Сontainer}>
                <HeaderComponent/>
                <Content/>
                <FooterComponent/>
            </div>
        </BrowserRouter>
    );
}

export default App;
