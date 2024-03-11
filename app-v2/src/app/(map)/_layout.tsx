import { MapBottomSheet } from '@/src/components/map-bottom-sheet/MapBottomSheet';
import { Map } from '@/src/components/map/Map';
import { ButtonOverlay } from '@/src/components/map/button-overlay/ButtonOverlay';
import { LocationServiceOverlay } from '@/src/components/map/location-service-overlay/LocationServiceOverlay';
import { useAedContext } from '@/src/context/AedContext';
import { useLocationContext } from '@/src/context/LocationContext';
import { useLocationDialog } from '@/src/hooks/useLocationDialog';
import { useLocationState } from '@/src/hooks/useLocationState';
import { requestAedData } from '@/src/services/aed-data.service';
import { toGeoJson } from '@/src/services/geojson-convert.service';
import { Slot, router } from 'expo-router';
import { Feature } from 'geojson';
import { useEffect, useState } from 'react';

export default () => {
  const showLocationDialog = useLocationDialog();
  const [snapPoints, setSnapPoints] = useState<string[]>(['15%', '90%']);
  const { state, dispatch } = useAedContext();
  const [focusOnUserLocation, setFocusOnUserLocation] = useState(true);
  useLocationState();
  const {
    state: { isLocationServicesTurnedOn },
  } = useLocationContext();

  useEffect(() => {
    const initData = async () => {
      const response = await requestAedData();
      dispatch({ type: 'SET_AED_DATA', payload: toGeoJson(response) });
    };
    initData();
  }, []);

  const onFeaturePress = (feature: Feature) => {
    dispatch({ type: 'SET_SELECTED_AED_DATA', payload: feature });
    setSnapPoints(['50%', '90%']);
    router.navigate('detail');
  };

  const onPositionPress = () => {
    if (isLocationServicesTurnedOn) {
      setFocusOnUserLocation(true);
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

  return (
    <>
      <Map
        data={state.data}
        focusOnUserLocation={focusOnUserLocation}
        setFocusOnUserLocation={setFocusOnUserLocation}
        onFeaturePress={onFeaturePress}
      />
      <ButtonOverlay onAddPress={onAddPress} onLayerPress={onLayerPress} onPositionPress={onPositionPress} />
      <LocationServiceOverlay />
      <MapBottomSheet snapPoints={snapPoints} setSnapPoints={setSnapPoints}>
        <Slot />
      </MapBottomSheet>
    </>
  );
};
