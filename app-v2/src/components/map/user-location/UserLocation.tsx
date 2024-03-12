import Colors from '@/src/constants/Colors';
import { CircleLayer, UserLocation as MaplibrUserLocation, ShapeSource } from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';
import { FeatureCollection } from 'geojson';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

type Props = {
  onUpdate: (location: [number, number]) => void;
};

export const UserLocation = (props: Props) => {
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const minDisplacement = 5;

  useEffect(() => {
    let watchId: number;
    if (Platform.OS !== 'ios') {
      watchId = Geolocation.watchPosition(
        (location: any) => {
          props.onUpdate([location.coords.longitude, location.coords.latitude]);
          setUserLocation([location.coords.longitude, location.coords.latitude]);
        },
        (error: any) => console.error(error),
        { enableHighAccuracy: true, distanceFilter: minDisplacement }
      );
    }

    return () => {
      watchId && Geolocation.clearWatch(watchId);
    };
  }, []);

  if (Platform.OS === 'ios') {
    return (
      <MaplibrUserLocation
        onUpdate={(location) => props.onUpdate([location.coords.longitude, location.coords.latitude])}
        minDisplacement={minDisplacement}
      />
    );
  }

  if (userLocation[0] === 0 && userLocation[1] === 0) {
    return null;
  }

  const p = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [userLocation[0], userLocation[1]],
        },
      },
    ],
  };

  return (
    <ShapeSource id="userLocation" shape={p as FeatureCollection}>
      <CircleLayer
        id="userLocation-lable"
        style={{
          circleColor: Colors.light.secondaryColor,
          circleOpacity: 1,
          circleStrokeWidth: 3,
          circleStrokeColor: 'white',
          circleRadius: 7,
          circleBlur: 0,
        }}
      />
      <CircleLayer
        id="userLocation-white"
        belowLayerID="userLocation-lable"
        style={{
          circleColor: 'transparent',
          circleOpacity: 1,
          circleRadius: 10,
          circleStrokeWidth: 5,
          circleStrokeColor: Colors.light.secondaryColor,
          circleStrokeOpacity: 0.3,
        }}
      />
    </ShapeSource>
  );
};
