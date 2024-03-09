import { MapBottomSheet } from '@/src/components/map-bottom-sheet/MapBottomSheet';
import { Map } from '@/src/components/map/Map';
import { useAedContext } from '@/src/context/AedContext';
import { requestAedData } from '@/src/services/aed-data.service';
import { toGeoJson } from '@/src/services/geojson-convert.service';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';

export default () => {
  const [snapPoints, setSnapPoints] = useState<string[]>(['15%', '90%']);
  const { state, dispatch } = useAedContext();

  useEffect(() => {
    const initData = async () => {
      const response = await requestAedData();
      dispatch({ type: 'SET_AED_DATA', payload: { data: toGeoJson(response) } });
    };
    initData();
  }, []);

  return (
    <>
      <Map data={state.data} />
      <MapBottomSheet snapPoints={snapPoints}>
        <Slot initialRouteName="/map/search/" />
      </MapBottomSheet>
    </>
  );
};
