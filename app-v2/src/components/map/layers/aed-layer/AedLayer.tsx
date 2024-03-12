import MapLibreGL from '@maplibre/maplibre-react-native';
import OnPressEvent from '@maplibre/maplibre-react-native/javascript/types/OnPressEvent';
import { FeatureCollection } from 'geojson';
import { aedSinglePointStyle, clusterCount, clusteredPoints } from './AedLayer.style';

type Props = {
  data: FeatureCollection;
  onPress: (e: any) => void;
};

export const AedLayer = (props: Props) => {
  const handlePress = (e: OnPressEvent) => {
    const features = e.features;
    props.onPress(features[0]);
  };

  return (
    <MapLibreGL.ShapeSource
      id="aed"
      onPress={(e) => handlePress(e)}
      shape={props.data}
      cluster={true}
      clusterRadius={60}
      clusterMaxZoomLevel={14}
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
