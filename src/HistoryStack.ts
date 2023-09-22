import * as MapboxDraw from '@mapbox/mapbox-gl-draw';

export default class HistoryStack {
  private _historyIndex = 0;
  private _history: GeoJSON.Feature[][] = [[]];
  private _annotations: unknown[] = [];

  constructor() {}

  public get current(): GeoJSON.Feature[] {
    return this._history[this._historyIndex];
  }

  public get hasUndo(): boolean {
    return this._historyIndex !== 0;
  }

  public get hasRedo(): boolean {
    return this._historyIndex !== this._history.length - 1;
  }

  public redo() {
    if (this._historyIndex < this._history.length) this._historyIndex++;
  }

  public undo() {
    if (this._historyIndex > 0) this._historyIndex--;
  }

  public operation(fn: (history: GeoJSON.Feature[]) => GeoJSON.Feature[], annotation?: unknown) {
    this._history = this._history.slice(0, this._historyIndex + 1);
    this._annotations = this._annotations.slice(0, this._historyIndex + 1);

    const newVersion = fn(this._history[this._historyIndex]);

    this._history.push(newVersion);
    this._annotations.push(annotation);
    this._historyIndex++;
  }
}
