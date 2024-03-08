import { FeatureCollection } from "geojson";
import { OsmFeature } from "../model/app";

const convertInternal = (data: OsmFeature[]) => {
  const geoJson = {
    type: "FeatureCollection",
    features:
      data !== null
        ? data?.map((feature: any) => {
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [feature.lon, feature.lat],
              },
              properties: {
                id: feature.id,
                ...feature.tags,
              },
            };
          })
        : [],
  };

  return geoJson as FeatureCollection;
};

export const toGeoJson = (data: OsmFeature[]): FeatureCollection => {
  if (!data) {
    return convertInternal([]);
  }

  return convertInternal(data);
};
