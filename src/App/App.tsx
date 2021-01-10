import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {fetchData} from '../utils';
import Content from '../Content';
import styled from './App.module.css'
import {HeaderComponent} from '../Header';
import {FooterComponent} from '../Footer';
import {AppRootStateType} from '../redux/store';
import {loaderSelector} from '../selectors';
import {loadStatus} from './app-reducer';
import { Preloader } from '../Preloader';



function App() {

    const dispatch = useDispatch()

    const loader = useSelector<AppRootStateType>(loaderSelector)

    useEffect(() => {
        debugger
        dispatch(fetchData())
    }, [])

    if (loader === loadStatus.loadingOn){
        return <Preloader/>
    }

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
