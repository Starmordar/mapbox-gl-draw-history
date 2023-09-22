import { Map } from 'mapbox-gl';
import HistoryStack from './stack';

export default class HistoryEvents {
  private _map: Map;
  private _history: HistoryStack;

  constructor(map: Map, history: HistoryStack) {
    this._map = map;
    this._history = history;
  }

  public setupListeners() {
    this._map.on('draw.create', this.createFeature);
    this._map.on('draw.update', this.updateFeature);
    this._map.on('draw.delete', this.deleteFeature);

    this._map.on('draw.combine', this.combineOrUncombineFeatures);
    this._map.on('draw.uncombine', this.combineOrUncombineFeatures);
  }

  public turnOffListeners() {
    this._map.off('draw.create', this.createFeature);
    this._map.off('draw.update', this.updateFeature);
    this._map.off('draw.delete', this.deleteFeature);

    this._map.off('draw.combine', this.combineOrUncombineFeatures);
    this._map.off('draw.uncombine', this.combineOrUncombineFeatures);
  }

  private createFeature(evt: MapboxDraw.DrawCreateEvent) {
    this._history.operation(data => [...data, ...evt.features]);
  }

  private updateFeature(evt: MapboxDraw.DrawUpdateEvent) {
    this.updateFeaturesGeometry(evt.features);
  }

  private deleteFeature(evt: MapboxDraw.DrawDeleteEvent) {
    const deleted = evt.features.map(feature => feature.id) as string[];
    this.bulkUpdateShapes({ deleted });
  }

  private combineOrUncombineFeatures(evt: MapboxDraw.DrawCombineEvent) {
    const deleted = evt.deletedFeatures.map(feature => feature.id) as string[];

    this.bulkUpdateShapes({ created: evt.createdFeatures, deleted });
  }

  private bulkUpdateShapes({ created = [], deleted = [] }: { created?: GeoJSON.Feature[]; deleted?: string[] }) {
    this._history.operation(data => [
      ...data.filter(v => typeof v.id === 'string' && !deleted.includes(v.id)),
      ...created,
    ]);
  }

  private updateFeaturesGeometry(features: GeoJSON.Feature[]) {
    this._history.operation(data =>
      data.map(feature => {
        const index = features.findIndex(s => s.id === feature.id);

        return index !== -1 ? { ...feature, geometry: { ...feature.geometry, ...features[index].geometry } } : feature;
      }),
    );
  }
}
