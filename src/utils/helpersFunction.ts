import {stopsPointType} from '../App';

export function calculateAndDisplayRoute(
    currentRouteCoordinate: stopsPointType[],
    directionsRenderer: google.maps.DirectionsRenderer,
    directionsService: google.maps.DirectionsService,
    markerArray: google.maps.Marker[],
    stepDisplay: google.maps.InfoWindow,
    map: google.maps.Map
) {
    // First, remove any existing markers from the map.
    for (let i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    let originLocation = new google.maps.LatLng(currentRouteCoordinate && currentRouteCoordinate[0].lat, currentRouteCoordinate && currentRouteCoordinate[0].lng);
    let destinationLocation = new google.maps.LatLng(currentRouteCoordinate && currentRouteCoordinate.slice(-1)[0].lat, currentRouteCoordinate && currentRouteCoordinate.slice(-1)[0].lng);
    let waypoints = [];
    let currentWaypoints =  currentRouteCoordinate.slice(1,-2);
    for (let i = 0; i < currentWaypoints.length; i++){
        waypoints.push({
            location: new google.maps.LatLng(currentWaypoints[i].lat, currentWaypoints[i].lng ),
            stopover: true
        })
    }
    directionsService.route(
        {
            origin: originLocation,
            waypoints: waypoints,
            optimizeWaypoints: true,
            destination: destinationLocation,
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
                showSteps(result, markerArray, stepDisplay, map)
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        }
    );
}

function showSteps(directionResult: google.maps.DirectionsResult, markerArray: google.maps.Marker[], stepDisplay: google.maps.InfoWindow,map: google.maps.Map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    const myRoute = directionResult.routes[0].legs[0];

    for (let i = 0; i < myRoute.steps.length; i++) {
        const marker = (markerArray[i] =
            markerArray[i] || new google.maps.Marker());
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(
            stepDisplay,
            marker,
            myRoute.steps[i].instructions,
            map
        );
    }
}

function attachInstructionText(
    stepDisplay: google.maps.InfoWindow,
    marker: google.maps.Marker,
    text: string,
    map: google.maps.Map
) {
    google.maps.event.addListener(marker, 'click', () => {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}