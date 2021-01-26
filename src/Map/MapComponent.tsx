import React, {useEffect, useMemo, useState} from 'react';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import styled from './MapBox.module.css'
import {Sidebar} from '../Sidebar';
import {stopsPointType} from '../App';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/store';
import {currentRouteCoordinateSelector} from '../selectors';
import {calculateAndDisplayRoute} from '../utils';



interface IMap {
    mapType: google.maps.MapTypeId,
    mapTypeControl?: boolean,
    arrayMarkers?: Array<stopsPointType> | any,
}

type GoogleMap = google.maps.Map
type GoogleMarker = google.maps.Marker

export const MapComponent: React.FC<IMap> = React.memo(({mapType, mapTypeControl, arrayMarkers}) => {

    const currentRouteCoordinate = useSelector<AppRootStateType, any>(currentRouteCoordinateSelector);

    const [map, setMap] = useState<GoogleMap>()

    let allMarkers: GoogleMarker[] = []
    let markerClusterer: any = null;
    let currentRouteMarkers: GoogleMarker[] = [];

    let directionsRenderer: google.maps.DirectionsRenderer = useMemo(() => {
        return new google.maps.DirectionsRenderer({map: map})
    }, [map]);

    let directionsService: google.maps.DirectionsService = useMemo(() => {
        return new google.maps.DirectionsService()
    }, [map]);
    let stepDisplay: google.maps.InfoWindow = useMemo(() => {
        return new google.maps.InfoWindow();
    }, []);


    // Create google maps
    const initMap = () => {
        const defaultAddress = new google.maps.LatLng(53.9, 27.56);

        setMap(new google.maps.Map(document.getElementById('map') as HTMLElement, {
            zoom: 8,
            center: defaultAddress,
            mapTypeControl: mapTypeControl,
            streetViewControl: false,
            zoomControl: true,
            mapTypeId: mapType,
        }))

    }
    useEffect(initMap, [])


    function addAllMarker(arr: stopsPointType[]) {
        arr.map((obj) => {
            const location = new google.maps.LatLng(obj.lat, obj.lng)
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: obj.name
            })
            allMarkers.push(marker)
        })
    }

    function setMapOnAll(map: google.maps.Map | null) {
        for (let i = 0; i < allMarkers.length; i++) {
            allMarkers[i].setMap(map);
        }
    }

    function showMarkers() {
        addAllMarker(arrayMarkers)
        // @ts-ignore // this @ts-ignore MarkerClusterer defined via script
        markerClusterer = new MarkerClusterer(map, allMarkers, {
            imagePath:
                'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        });
    }

    function clearMarkers() {
        setMapOnAll(null);
        markerClusterer.clearMarkers()
    }

    function deleteMarkers() {
        clearMarkers();
        allMarkers = [];

    }

    function addRouterMarker(arr: stopsPointType[]) {
        arr.map((obj) => {
            const location = new google.maps.LatLng(obj.lat, obj.lng)
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: obj.name
            })
            currentRouteMarkers.push(marker)
        })
    }

    useEffect(() => {
        for (let i = 0; i < currentRouteMarkers.length; i++) {
            currentRouteMarkers[i].setMap(null);
        }
        currentRouteMarkers = []
        if (currentRouteCoordinate) {
            addRouterMarker(currentRouteCoordinate)
            calculateAndDisplayRoute(
                currentRouteCoordinate,
                directionsRenderer,
                directionsService,
                currentRouteMarkers,
                stepDisplay,
                // @ts-ignore // this @ts-ignore MarkerClusterer defined via script
                map
            );
        }
    }, [currentRouteCoordinate])

    const clearMarkersRoute = () => {
        for (let i = 0; i < currentRouteMarkers.length; i++) {
            currentRouteMarkers[i].setMap(null);
        }
        currentRouteMarkers = []
    }

    const tabHendler = (key: string) => {
        if (key === 'stops') {
            showMarkers()
            directionsRenderer.set('directions', null)
            clearMarkersRoute()
        }
        if (key === 'transportRoutes') {
            deleteMarkers()
        }
    }

    return (
        <div className={styled.mapContainer}>
            <Sidebar clearMarkersRoute={clearMarkersRoute} tabHendler={tabHendler}/>
            <div id={'map'} className={styled.mapContainer_map}></div>
        </div>
    )
})