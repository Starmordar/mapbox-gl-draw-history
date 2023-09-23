import { Map } from 'mapbox-gl';
import HistoryStack from '../HistoryStack';

export default class HistoryEvents {
  private _map: Map;
  private _history: HistoryStack;

  constructor(map: Map, history: HistoryStack) {
    this._map = map;
    this._history = history;
  }

  setupEvents() {
    this._map.on('draw.create', this.createFeatures.bind(this));
    this._map.on('draw.update', this.updateFeatures.bind(this));
    this._map.on('draw.delete', this.deleteFeatures.bind(this));

    this._map.on('draw.combine', this.combineOrUncombineFeatures.bind(this));
    this._map.on('draw.uncombine', this.combineOrUncombineFeatures.bind(this));
  }

  turnOffEvents() {
    this._map.off('draw.create', this.createFeatures.bind(this));
    this._map.off('draw.update', this.updateFeatures.bind(this));
    this._map.off('draw.delete', this.deleteFeatures.bind(this));

    this._map.off('draw.combine', this.combineOrUncombineFeatures.bind(this));
    this._map.off('draw.uncombine', this.combineOrUncombineFeatures.bind(this));
  }

  private createFeatures(evt: MapboxDraw.DrawCreateEvent) {
    this._history.operation(data => [...data, ...evt.features]);
  }

  private updateFeatures(evt: MapboxDraw.DrawUpdateEvent) {
    this._history.operation(data =>
      data.map(feature => {
        const featureIndex = evt.features.findIndex(s => s.id === feature.id);
        return featureIndex !== -1 ? evt.features[featureIndex] : feature;
      }),
    );
  }

  private deleteFeatures(evt: MapboxDraw.DrawDeleteEvent) {
    const deleted = evt.features.map(feature => feature.id) as string[];
    this.bulkUpdateFeatures({ deleted });
  }

  private combineOrUncombineFeatures(evt: MapboxDraw.DrawCombineEvent) {
    const deleted = evt.deletedFeatures.map(feature => feature.id) as string[];

    this.bulkUpdateFeatures({ created: evt.createdFeatures, deleted });
  }

  private bulkUpdateFeatures({ created = [], deleted = [] }: { created?: GeoJSON.Feature[]; deleted?: string[] }) {
    this._history.operation(data => [
      ...data.filter(v => typeof v.id === 'string' && !deleted.includes(v.id)),
      ...created,
    ]);
  }
}
