import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import MapLibreGL, { MarkerView, UserLocation } from '@maplibre/maplibre-react-native';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, View } from 'react-native';
import { Constants } from './Constants';
import { Camera } from './camera/Camera';
import { AedLayer } from './layers/aed-layer/AedLayer';
import { Osmlayer } from './layers/osm-layer/OsmLayer';
import { AedDetail } from '../aed-detail/AedDetail';

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
MapLibreGL.setAccessToken(null);

const layers = [
  {
    id: Constants.OSM_SOURCE_ID,
    url: Constants.OSM_URL,
    attribution: Constants.OSM_ATTRIBUTION,
  },
  {
    id: Constants.OSM_CH_SOURCE_ID,
    url: Constants.OSM_CH_URL,
    attribution: Constants.OSM_CH_ATTRIBUTION,
  },
];

type Props = {
  data: any;
};

export const Map = (props: Props) => {
  const [visibleLayers, setVisibleLayers] = useState<string[]>([]);
  const map = useRef<MapLibreGL.MapView>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([0, 0]);
  const [cameraLocation, setCameraLocation] = useState<[number, number]>([0, 0]);
  const [initialUserLocatuionFocus, setInitialUserLocationFocus] = useState(true);
  const [detailData, setDetailData] = useState<any>(null);

  useEffect(() => {
    for (const layerId of visibleLayers) {
      map.current?.setSourceVisibility(true, layerId);
    }

    for (const layer of layers) {
      if (!visibleLayers.includes(layer.id)) {
        map.current?.setSourceVisibility(false, layer.id);
      }
    }
  }, [visibleLayers]);

  useEffect(() => {
    if (initialUserLocatuionFocus && userLocation[0] > 0 && userLocation[1] > 0) {
      setCameraLocation(userLocation);
      setInitialUserLocationFocus(false);
    }
  }, [userLocation]);

  const onLayerChange = (layerId: string) => {
    const isLayerVisible = visibleLayers.includes(layerId);
    if (isLayerVisible) {
      setVisibleLayers(visibleLayers.filter((layer) => layer !== layerId));
    } else {
      setVisibleLayers([...visibleLayers, layerId]);
    }
  };

  return (
    <View style={styles.page}>
      <MapLibreGL.MapView
        style={styles.map}
        logoEnabled={false}
        zoomEnabled={true}
        pitchEnabled={true}
        styleURL={Constants.BASISKARTE_STYLE_URL}
        attributionPosition={{ bottom: 5, left: 5 }}
        ref={map}
        preferredFramesPerSecond={60}
      >
        <UserLocation onUpdate={(location) => setUserLocation([location.coords.longitude, location.coords.latitude])} />
        <Camera center={cameraLocation} zoom={14} />
        {layers.map((layer) => (
          <Osmlayer key={layer.id} sourceId={layer.id} tileUrlTemplates={[layer.url]} attribution={layer.attribution} />
        ))}
        <AedLayer data={props.data} onPress={(d) => setDetailData(d)} />
        <MarkerView coordinate={markerPosition}>
          <FontAwesome5 name="map-marker" size={32} color="red" />
        </MarkerView>
      </MapLibreGL.MapView>
      <AedDetail data={detailData} />
      <View style={styles.buttons}>
        <Button
          title="OSM"
          color={visibleLayers.includes(Constants.OSM_SOURCE_ID) ? 'green' : 'red'}
          onPress={() => onLayerChange(Constants.OSM_SOURCE_ID)}
        ></Button>
        <Button
          title="OSM Swiss"
          color={visibleLayers.includes(Constants.OSM_CH_SOURCE_ID) ? 'green' : 'red'}
          onPress={() => onLayerChange(Constants.OSM_CH_SOURCE_ID)}
        ></Button>
        <Button
          title="Set center"
          onPress={() => {
            map.current?.getCenter().then((center) => {
              setMarkerPosition([center[0], center[1]]);
            });
          }}
        ></Button>
        <Link href={'/about'} asChild>
          <Pressable>
            <FontAwesome6 name="circle-info" size={24} color="black" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    bottom: 20,
  },
  map: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
});
