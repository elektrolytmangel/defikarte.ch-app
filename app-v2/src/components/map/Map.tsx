import MapLibreGL, { UserLocation } from '@maplibre/maplibre-react-native';
import { Feature } from 'geojson';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from '../../constants/Map';
import { AedLayer } from './layers/aed-layer/AedLayer';
import { Osmlayer } from './layers/osm-layer/OsmLayer';

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
  focusOnUserLocation?: boolean;
  setFocusOnUserLocation?: (focus: boolean) => void;
  onFeaturePress?: (feature: Feature) => void;
};

export const Map = (props: Props) => {
  const [visibleLayers, setVisibleLayers] = useState<string[]>([]);
  const map = useRef<MapLibreGL.MapView>(null);
  const [cameraLocation, setCameraLocation] = useState<[number, number]>(Constants.MAP_INITIAL_CENTER);
  const [cameraZoom, setCameraZoom] = useState(Constants.MAP_INITIAL_ZOOM);
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const [detailData, setDetailData] = useState<any>(null);
  const cameraRef = useRef<MapLibreGL.Camera>(null);

  const flyTo = (location: [number, number], zoom?: number) => {
    setCameraLocation(location);
    if (zoom) {
      setCameraZoom(zoom);
      cameraRef.current?.setCamera({ centerCoordinate: location, zoomLevel: zoom });
    } else {
      cameraRef.current?.moveTo(location, zoom);
    }
  };

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
    if (props.focusOnUserLocation === true && userLocation[0] > 0 && userLocation[1] > 0) {
      props.setFocusOnUserLocation?.(false);
      flyTo(userLocation, Constants.MAP_USER_LOCATION_ZOOM);
    }
  }, [userLocation, props.focusOnUserLocation, props.setFocusOnUserLocation]);

  const onFeaturePress = async (feature: Feature) => {
    if (feature) {
      setDetailData(feature);
      if (feature.geometry.type === 'Point' && feature.properties?.cluster !== true) {
        const correction = 0.001;
        flyTo([feature.geometry.coordinates[0], feature.geometry.coordinates[1] - correction], Constants.MAP_AED_LOCATION_ZOOM);

        props.onFeaturePress?.(feature);
      } else if (feature.geometry.type === 'Point' && feature.properties?.cluster === true) {
        // ToDo: fit to bounds instead of go to center where probably not even data is
        flyTo([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]);
      }
    }
  };

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
        <UserLocation
          onUpdate={(location) => setUserLocation([location.coords.longitude, location.coords.latitude])}
          minDisplacement={10}
        />
        <MapLibreGL.Camera ref={cameraRef} centerCoordinate={cameraLocation} zoomLevel={cameraZoom}></MapLibreGL.Camera>
        {layers.map((layer) => (
          <Osmlayer key={layer.id} sourceId={layer.id} tileUrlTemplates={[layer.url]} attribution={layer.attribution} />
        ))}
        <AedLayer data={props.data} onPress={(d) => onFeaturePress(d)} />
      </MapLibreGL.MapView>
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

/*
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
      
       <MarkerView coordinate={markerPosition}>
          <FontAwesome5 name="map-marker" size={32} color="red" />
        </MarkerView>
      */
