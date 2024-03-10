export class Constants {
  static readonly BASISKARTE_STYLE_URL = 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json';
  static readonly OSM_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  static readonly OSM_CH_URL = 'https://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png';

  static readonly AED_LAYER_ID = 'aed';
  static readonly AED_SOURCE_ID = 'aed-source';
  static readonly OSM_LAYER_ID = 'osm';
  static readonly OSM_SOURCE_ID = 'osm-source';
  static readonly OSM_CH_SOURCE_ID = 'osm-ch-source';

  static readonly OSM_ATTRIBUTION = '&copy; OpenStreetMap contributors';
  static readonly OSM_CH_ATTRIBUTION = '&copy; OpenStreetMap contributors';

  static readonly MAP_INITIAL_CENTER: [number, number] = [7.44744, 46.94809];
  static readonly MAP_INITIAL_ZOOM: number = 8;
  static readonly MAP_USER_LOCATION_ZOOM: number = 14;
  static readonly MAP_AED_LOCATION_ZOOM: number = 16;
}
