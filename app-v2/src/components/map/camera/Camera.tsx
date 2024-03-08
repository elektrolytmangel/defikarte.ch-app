import { useEffect, useState } from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';

type Props = {
  center: [number, number];
  zoom: number;
};

export const Camera = (props: Props) => {
  const [center, setCenter] = useState([8.2275, 46.8182]);
  const [zoom, setZoom] = useState(8);

  useEffect(() => {
    if (props.center[0] > 0 && props.center[1] > 0) {
      setCenter(props.center);
      setZoom(props.zoom);
    }
  }, [props.center, props.zoom]);

  return <MapLibreGL.Camera centerCoordinate={center} zoomLevel={zoom}></MapLibreGL.Camera>;
};
