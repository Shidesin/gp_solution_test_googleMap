import React, {useEffect, useRef, useState} from 'react';
import styled from './MapBox.module.css'
import {stopPiontType} from '../utils/spotPoint';
import MarkerClusterer from '@googlemaps/markerclustererplus';

interface IMap {
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean,
    arrayMarkers?: Array<stopPiontType> | any
}

type GoogleLatLng = google.maps.LatLng
type GoogleMap = google.maps.Map

const MapBox: React.FC<IMap> = ({mapType, mapTypeControl, arrayMarkers}) => {

    const ref = useRef<HTMLDivElement>(null)

    const [map, setMap] = useState<GoogleMap>();

    const startMap = (): void => {
        if (!map) {
            defaultMapStart()
        }
    }

    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng(53.9, 27.56);
        initMap(8, defaultAddress)
    }

    const addMarker = arrayMarkers.map((obj: { lat: number; lng: number; name: any; }) => {
        const location = new google.maps.LatLng(obj.lat, obj.lng)
        return new google.maps.Marker({
            position: location,
            map: map,
            title: obj.name
        })
    })


    // @ts-ignore // this @ts-ignore MarkerClusterer defined via script
    new MarkerClusterer(map, addMarker, {
        imagePath:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    });


    const initMap = (zoomLevel: number, address: GoogleLatLng) => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    mapTypeControl: mapTypeControl,
                    streetViewControl: false,
                    zoomControl: true,
                    mapTypeId: mapType,
                })
            );
        }
    }

    useEffect(startMap, [map])

    return (
        <div className={styled.mapContainer}>
            <div ref={ref} className={styled.mapContainer_map}></div>
        </div>
    )
}

export default MapBox;