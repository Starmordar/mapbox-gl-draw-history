type TCompareResult = { deleted: string[]; created: GeoJSON.Feature[]; updated: GeoJSON.Feature[] };

export default class FeaturesComparator {
  static compare(currentFeatures: GeoJSON.Feature[], previousFeatures: GeoJSON.Feature[]): TCompareResult {
    let created: GeoJSON.Feature[] = [];
    let updated: GeoJSON.Feature[] = [];
    let deleted: string[] = [];

    currentFeatures.forEach(feature => {
      const prevFeature = previousFeatures.find(prevF => prevF.id === feature.id);
      if (prevFeature && !FeaturesComparator.isEqual(prevFeature, feature)) updated.push(feature);
      else if (!prevFeature) created.push(feature);
    });

    previousFeatures.forEach(feature => {
      const currFeature = currentFeatures.find(prevF => prevF.id === feature.id);
      if (!currFeature) deleted.push(feature.id as string);
    });

    return { created, deleted, updated };
  }

  static isEqual(feature1: GeoJSON.Feature, feature2: GeoJSON.Feature) {
    return JSON.stringify(feature1) === JSON.stringify(feature2);
  }
}
