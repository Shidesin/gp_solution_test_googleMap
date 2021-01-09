import React, {useEffect, useState} from 'react';
import loadMapApi from '../utils';
import MapBox from './MapBox';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import {getBreakPoints} from '../selectors/appSelector';

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
        <div>
            {scriptLoader &&
            <MapBox mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} arrayMarkers={arrayMarkers}/>}
        </div>
    );
}