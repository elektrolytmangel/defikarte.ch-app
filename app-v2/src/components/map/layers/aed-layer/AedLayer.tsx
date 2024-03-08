import MapLibreGL from '@maplibre/maplibre-react-native';
import { FeatureCollection } from 'geojson';
import { clusterCount, clusteredPoints, mag1, mag2, mag3, mag4, mag5, aedSinglePointStyle } from './AedLayer.style';

type Props = {
  data: FeatureCollection;
  onPress: (e: any) => void;
};

export const AedLayer = (props: Props) => {
  const handlePress = (e: any) => {
    console.log('AedLayer handlePress', e.features);
    props.onPress(e.features[0]);
  };
  return (
    <MapLibreGL.ShapeSource
      id="aed"
      onPress={(e) => handlePress(e)}
      shape={props.data}
      cluster={true}
      clusterRadius={50}
      clusterMaxZoomLevel={14}
      clusterProperties={{
        mag1: [
          ['+', ['accumulated'], ['get', 'mag1']],
          ['case', mag1, 1, 0],
        ],
        mag2: [
          ['+', ['accumulated'], ['get', 'mag2']],
          ['case', mag2, 1, 0],
        ],
        mag3: [
          ['+', ['accumulated'], ['get', 'mag3']],
          ['case', mag3, 1, 0],
        ],
        mag4: [
          ['+', ['accumulated'], ['get', 'mag4']],
          ['case', mag4, 1, 0],
        ],
        mag5: [
          ['+', ['accumulated'], ['get', 'mag5']],
          ['case', mag5, 1, 0],
        ],
      }}
    >
      <MapLibreGL.SymbolLayer id="clusterCount" aboveLayerID="clusteredPoints" filter={['has', 'point_count']} style={clusterCount} />
      <MapLibreGL.CircleLayer id="clusteredPoints" filter={['has', 'point_count']} style={clusteredPoints} />
      <MapLibreGL.SymbolLayer id="singlePointImage" filter={['!', ['has', 'point_count']]} style={aedSinglePointStyle} />
      <MapLibreGL.CircleLayer
        belowLayerID="singlePointImage"
        id="singlePointCircle"
        filter={['!', ['has', 'point_count']]}
        style={aedSinglePointStyle}
      />
    </MapLibreGL.ShapeSource>
  );
};
