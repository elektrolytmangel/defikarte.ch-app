import { MapBottomSheet } from '@/src/components/map-bottom-sheet/MapBottomSheet';
import { Map } from '@/src/components/map/Map';
import { ButtonOverlay } from '@/src/components/map/button-overlay/ButtonOverlay';
import { useAedContext } from '@/src/context/AedContext';
import { requestAedData } from '@/src/services/aed-data.service';
import { toGeoJson } from '@/src/services/geojson-convert.service';
import { Slot, router } from 'expo-router';
import { Feature } from 'geojson';
import { useEffect, useRef, useState } from 'react';

export default () => {
  const [snapPoints, setSnapPoints] = useState<string[]>(['15%', '90%']);
  const { state, dispatch } = useAedContext();
  const [focusOnUserLocation, setFocusOnUserLocation] = useState(true);

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
    console.log('position');
    setFocusOnUserLocation(true);
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
      <MapBottomSheet snapPoints={snapPoints} setSnapPoints={setSnapPoints}>
        <Slot />
      </MapBottomSheet>
    </>
  );
};
