import { CircleLayerStyle, SymbolLayerStyle } from '@maplibre/maplibre-react-native';

const icon = require('@/assets/images/marker.png');

const aedSinglePointStyle: SymbolLayerStyle & CircleLayerStyle = {
  iconImage: icon,
  iconAllowOverlap: true,
  iconKeepUpright: true,
  iconSize: 0.25,
  iconOffset: [0, 3],
  circleColor: '#449847',
  circleOpacity: 1,
  circleStrokeWidth: 2,
  circleStrokeColor: ['match', ['get', 'opening_hours'], '24/7', '#449847', 'orange'],
  circleRadius: 12,
};

const clusterCount: SymbolLayerStyle = {
  textFont: ['Frutiger Neue Condensed Regular'],
  textField: ['format', ['get', 'point_count'], { 'font-scale': 1 }],
  textSize: 15,
  textPitchAlignment: 'map',
  textAllowOverlap: true,
  textColor: 'white',
  textAnchor: 'center',
  textOffset: [-0.05, 0.1],
};

const clusteredPoints: CircleLayerStyle = {
  circlePitchAlignment: 'map',
  circleColor: '#449847',
  circleRadius: ['step', ['get', 'point_count'], 12, 20, 14, 100, 18, 500, 18],
  circleOpacity: 1,
  circleStrokeOpacity: 0.7,
  circleStrokeWidth: 8,
  circleStrokeColor: '#449847',
};

export { aedSinglePointStyle, clusterCount, clusteredPoints };
