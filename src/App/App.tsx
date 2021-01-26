import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDataRoutes, fetchDataStopsPoint} from '../utils';
import Content from '../Content';
import styled from './App.module.css'
import {HeaderComponent} from '../Header';
import {FooterComponent} from '../Footer';
import {AppRootStateType} from '../redux/store';
import {loaderSelector} from '../selectors';
import {loadData, loadStatus} from './app-reducer';
import {Preloader} from '../Preloader';


function App() {
    const dispatch = useDispatch()

    const loader = useSelector<AppRootStateType>(loaderSelector)

    useEffect(() => {
        dispatch(loadData(loadStatus.loadingOn))
        dispatch(fetchDataStopsPoint())
        dispatch(fetchDataRoutes())
        setTimeout(() => dispatch(loadData(loadStatus.loadingOff)), 2000)
    }, [])

    if (loader === loadStatus.loadingOn){
        return <Preloader/>
    }

    return (
            <div className={styled.main_container}>
                <HeaderComponent/>
                <Content/>
                <FooterComponent/>
            </div>
    );
}

export default App;
