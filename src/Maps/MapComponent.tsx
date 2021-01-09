import React from 'react';
import {useLoadScript} from '@react-google-maps/api';

export const MapComponent = () => {

    const apiKey: any = process.env['REACT_APP_GOOGLE_MAPS_API_KEY ']

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey,

    })
}