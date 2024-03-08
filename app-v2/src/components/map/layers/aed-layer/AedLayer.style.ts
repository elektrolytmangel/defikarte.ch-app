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
  circleRadius: 25,
  circleOpacity: 1,
  circleStrokeOpacity: 0.7,
  circleStrokeWidth: 8,
  circleStrokeColor: '#449847',
};

const mag1 = ['<', ['get', 'mag'], 2];
const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
const mag5 = ['>=', ['get', 'mag'], 5];

export { aedSinglePointStyle, clusterCount, clusteredPoints, mag1, mag2, mag3, mag4, mag5 };
