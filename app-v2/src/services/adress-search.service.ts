import axios from 'axios';
import { FeatureCollection } from 'geojson';

export const searchAddress = async (searchText: string) => {
  const params = new URLSearchParams();
  params.append('searchText', searchText);
  params.append('type', 'locations');
  params.append('returnGeometry', 'true');
  params.append('limit', '15');
  params.append('sr', '4326');
  params.append('geometryFormat', 'geojson');

  const url = new URL('https://api3.geo.admin.ch/rest/services/api/SearchServer');
  url.search = params.toString();

  try {
    const response = await axios.get<FeatureCollection>(url.toString(), {
      method: 'GET',
      headers: {
        'ACCESS-Control-Allow-Origin': '*',
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }

  return { type: 'FeatureCollection', features: [] } as FeatureCollection;
};
