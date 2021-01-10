import React, {useEffect, useState} from 'react';
import loadMapApi from '../utils';
import MapBox from './MapBox';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import {getBreakPoints} from '../selectors/appSelector';
import styled from './MapBox.module.css';

export const MapBoxContainer = () => {

    const [scriptLoader, setScriptLoader] = useState<boolean>(false)

    const arrayMarkers = useSelector<AppRootStateType>(getBreakPoints)

    useEffect(() => {
        const googleMapScripts =loadMapApi();
        googleMapScripts.addEventListener('load', function () {
            setScriptLoader(true)
        })
    },[])

    return (
        <div className={styled.mapContainer}>
            {scriptLoader &&
            <MapBox mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} arrayMarkers={arrayMarkers}/>}
        </div>
    );
}