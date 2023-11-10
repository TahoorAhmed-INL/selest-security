import React, {useState, useEffect} from 'react';

import {View, ImageURISource} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE, Polygon, Polyline} from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';

import {requestLocationPermission} from '../../lib/permissionHelpers';

import {GreenMarker, UserMarker} from '../../assets/images';

import MapControls from './MapControls';
import DestinationAction from './DestinationAction';

import MapViewDirections from 'react-native-maps-directions';

interface Location {
  latitude: number;
  longitude: number;
}

interface MapWithPolylineProps {
  destination: Location;
}

const MapWithPolyline: React.FC<MapWithPolylineProps> = ({destination}) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [pathCoordinates, setPathCoordinates] = useState<Location[]>([]);

  const [isStarted, setIsStarted] = useState(false);

  const [hasArrived, setHasArrived] = useState(false);

  console.log(pathCoordinates, '____a');

  useEffect(() => {
    const setCurrentLocation = (position: any) => {
      console.log(position,"asdasdad kdjhaskjd hajkd");
      const {latitude, longitude} = position.coords;
      const updatedUserLocation = {latitude, longitude};
      setUserLocation(updatedUserLocation);
      setPathCoordinates([updatedUserLocation]);
    };

    const watchUserPosition = () => {
      const watchId = Geolocation.watchPosition(
        position => setCurrentLocation(position),
        error => {
          console.error(error);
        },
        {enableHighAccuracy: true, distanceFilter: 5},
      );

      return () => {
        Geolocation.clearWatch(watchId);
      };
    };

    const getInitialLocation = async () => {
      try {
        Geolocation.getCurrentPosition(position => setCurrentLocation(position),
          error => {
            console.error(error);
          },
          {enableHighAccuracy: true},
        );
      } catch (error) {
        console.error(error);
      }
    };

    // requestLocationPermission(() => {
    //     getInitialLocation();
    //     watchUserPosition();
    //   },
    //   () => console.log('Access denied'),
    // );
    const initializeLocation = async () => {
      try {
        await requestLocationPermission(
          () => {
            getInitialLocation();
            watchUserPosition();
          },
          () => console.log('Access denied'),
        );
      } catch (error) {
        console.error(error);
      }
    };
  
    initializeLocation();

    
    return () => {
      const clearWatch = watchUserPosition();
      clearWatch();
    };
  }, []);


  console.log(destination,"props destination")

  return (
    <View style={{flex: 1}}>
      {userLocation !== null && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={{
            latitude: (userLocation.latitude + destination?.latitude) / 2,
            longitude: (userLocation.longitude + destination?.longitude) / 2,
            latitudeDelta:
              Math.abs(destination?.latitude - userLocation.latitude || 0) * 1.4,
            longitudeDelta:
              Math.abs(destination?.longitude - userLocation.longitude || 0) *
              1.4,
          }}>
          {destination?.latitude && (
            <Marker coordinate={destination} title="Destination" 
            
            />
          )}
          {pathCoordinates.length > 0 && (
            <>
              <MapViewDirections
              origin={pathCoordinates[0]}
              destination={destination}
              apikey="AIzaSyAMnCr9yLPHekNsJVDiwaj6pFqKVvN1XWo"
              strokeWidth={5}
              strokeColor="#000027"
            />
              <Marker
                coordinate={userLocation}
                title="You are here"
                image={GreenMarker as ImageURISource}
              />
              {isStarted && (
                <Polyline
                  coordinates={[pathCoordinates[0], destination]}
                  strokeWidth={3}
                  strokeColor="blue"
                />
              //   <Polygon
              //   coordinates={[pathCoordinates[0],destination]}
              //   strokeWidth={2}
              //   strokeColor="#FF0000"
              //   fillColor="rgba(255,0,0,0.5)"
              // />
              )}
            </>
          )}
        </MapView>
      )}
      {!hasArrived ? (
        <MapControls setIsStarted={setIsStarted} isStarted={isStarted} />
      ) : (
        <DestinationAction />
      )}
    </View>
  );
};

export default MapWithPolyline;
