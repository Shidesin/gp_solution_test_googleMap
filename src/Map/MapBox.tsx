import React, {useEffect, useRef, useState} from 'react';
import styled from './MapBox.module.css'
import {stopPiontType} from '../StopPoint/spotPoint';

interface IMap {
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean,
    arrayMarker?: Array<stopPiontType> | any
}

interface IMarker {
    address: string
    latitude: number
    longitude: number
}


type GoogleLatLng = google.maps.LatLng
type GoogleMap = google.maps.Map
// type GoogleMarker = google.maps.Marker;

const MapBox: React.FC<IMap> = ({mapType, mapTypeControl, arrayMarker}) => {


    const ref = useRef<HTMLDivElement>(null)

    const [map, setMap] = useState<GoogleMap>();

    const [marker, setMarker] = useState<IMarker>();

    const startMap = (): void => {
        if (!map) {
            defaultMapStart()
        }
    }

    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng(53.9, 27.56);
        initMap(15, defaultAddress)
    }

    const addMarker = (props: Array<stopPiontType>): void => {
        props.map(obj => {
            const location = new google.maps.LatLng(obj.lat, obj.lng)
            new google.maps.Marker({
                position: location,
                map: map,
                title: obj.name
            })
        })

    }


    if (arrayMarker){
        addMarker((arrayMarker))
    }


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