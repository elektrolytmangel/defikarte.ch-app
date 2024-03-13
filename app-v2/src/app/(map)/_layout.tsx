import { MapBottomSheet } from '@/src/components/map-bottom-sheet/MapBottomSheet';
import { Map } from '@/src/components/map/Map';
import { ButtonOverlay } from '@/src/components/map/button-overlay/ButtonOverlay';
import { LocationServiceOverlay } from '@/src/components/map/location-service-overlay/LocationServiceOverlay';
import { Constants } from '@/src/constants/Map';
import { useAedContext } from '@/src/context/AedContext';
import { useLocationContext } from '@/src/context/LocationContext';
import { useSearchContext } from '@/src/context/SearchContext';
import { useLocationDialog } from '@/src/hooks/useLocationDialog';
import { useLocationState } from '@/src/hooks/useLocationState';
import { requestAedData } from '@/src/services/aed-data.service';
import { toGeoJson } from '@/src/services/geojson-convert.service';
import { Slot, router, usePathname } from 'expo-router';
import { Feature } from 'geojson';
import { useEffect, useRef, useState } from 'react';

const routeSnapPointMapping: { [key: string]: string[] } = {
  '/': ['15%', '90%'],
  '/detail': ['50%', '90%'],
  '/address': ['25%'],
};

export default () => {
  useLocationState();
  const showLocationDialog = useLocationDialog();
  const pathname = usePathname();
  const [snapPoints, setSnapPoints] = useState<string[]>(['15%', '90%']);
  const { state, dispatch } = useAedContext();
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const {
    state: { isLocationServicesTurnedOn },
  } = useLocationContext();
  const {
    state: { selectedResult },
    dispatch: searchDispatch,
  } = useSearchContext();
  const flyTo = useRef<(location: [number, number], zoom?: number) => void>(() => {});

  useEffect(() => {
    const initData = async () => {
      const response = await requestAedData();
      dispatch({ type: 'SET_AED_DATA', payload: toGeoJson(response) });
    };
    initData();
  }, []);

  useEffect(() => {
    setSnapPoints(routeSnapPointMapping[pathname] || ['15%', '90%']);
  }, [pathname]);

  useEffect(() => {
    const markerPosition = selectedResult?.geometry.type === 'Point' ? (selectedResult.geometry.coordinates as [number, number]) : null;
    if (markerPosition) {
      flyTo.current?.(markerPosition, Constants.MAP_AED_LOCATION_ZOOM);
    }
  }, [selectedResult]);

  const onFeaturePress = (feature: Feature) => {
    dispatch({ type: 'SET_SELECTED_AED_DATA', payload: feature });
    router.navigate('detail');
  };

  const onPositionPress = () => {
    if (isLocationServicesTurnedOn) {
      flyTo.current?.(userLocation, Constants.MAP_USER_LOCATION_ZOOM);
    } else {
      showLocationDialog();
    }
  };

  const onLayerPress = () => {
    console.log('layer');
  };

  const onAddPress = () => {
    console.log('add');
  };

  const handleOnClose = () => {
    searchDispatch({ type: 'RESET_STATE' });
  };

  const markerPosition = selectedResult?.geometry.type === 'Point' ? (selectedResult.geometry.coordinates as [number, number]) : null;
  return (
    <>
      <Map
        data={state.data}
        setUserLocation={setUserLocation}
        setFlyTo={(f) => (flyTo.current = f)}
        onFeaturePress={onFeaturePress}
        markerPosition={markerPosition}
      />
      <ButtonOverlay onAddPress={onAddPress} onLayerPress={onLayerPress} onPositionPress={onPositionPress} />
      <LocationServiceOverlay />
      <MapBottomSheet snapPoints={snapPoints} setSnapPoints={setSnapPoints} onClose={() => handleOnClose()}>
        <Slot />
      </MapBottomSheet>
    </>
  );
};
