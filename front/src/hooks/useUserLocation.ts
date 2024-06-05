import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setUserLocationError(false);
      },
      () => setUserLocationError(true),
      {enableHighAccuracy: true},
    );
  }, []);

  return {userLocation, isUserLocationError};
};

export default useUserLocation;
