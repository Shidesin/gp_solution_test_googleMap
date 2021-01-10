import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Sidebar} from '../Sidebar';
import {MapBoxContainer} from '../Map';
import styled from './Content.module.css'
import {TransportRoutes} from '../TransportRoutes';
import {SearchTrack} from '../SearchTrack';


const Content: React.FC = () => {
    return (
        <div className={styled.contentBox}>
            <Sidebar/>
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to={'/map'}/>}/>
                <Route path={'/map'} exact render={() => <MapBoxContainer/>}/>
                <Route path={'/transportRoutes'} render={() => <TransportRoutes/>}/>
                <Route path={'/searchTrack'} render={() => <SearchTrack/>}/>
            </Switch>
        </div>
    )
}

export default Content;