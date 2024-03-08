import MapLibreGL from '@maplibre/maplibre-react-native';

type Props = {
  attribution?: string;
  tileUrlTemplates: string[];
  sourceId: string;
};

export const Osmlayer = (props: Props) => {
  return (
    <MapLibreGL.RasterSource id={props.sourceId} attribution={props.attribution} tileUrlTemplates={props.tileUrlTemplates}>
      <MapLibreGL.RasterLayer id={props.sourceId + '-osm'}></MapLibreGL.RasterLayer>
    </MapLibreGL.RasterSource>
  );
};
