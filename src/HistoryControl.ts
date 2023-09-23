import HistoryStack from './HistoryStack';
import HistoryEvents from './events/HistoryEvents';
import KeybindingEvents from './events/KeybindingEvents';
import FeaturesComparator from './FeaturesComparator';

import type { IControl, Map } from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import type { IControlButtonOptions, IControlOptions } from './types';

export default class HistoryControl implements IControl {
  public history?: HistoryStack;

  private _controlGroup?: HTMLElement;
  private _map?: Map;
  private _historyEvents?: HistoryEvents;
  private _keybindingEvents?: KeybindingEvents;

  private _drawControl: MapboxDraw;

  private _options: IControlOptions = {
    constrols: true,
    keybindings: false,
    listeners: true,
  };

  constructor(drawControl: MapboxDraw, options?: Partial<IControlOptions>) {
    if (options) {
      this._options = Object.assign(this._options, options);
    }

    this._drawControl = drawControl;
  }

  onAdd(map: Map): HTMLElement {
    this._map = map;
    this._controlGroup = document.createElement('div');
    this._controlGroup.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    this.setupHistory();

    if (this._options.constrols) {
      this.addControlButtons();
    }

    return this._controlGroup;
  }

  undo() {
    if (!this.history || !this.history.hasUndo) return;

    this.history.undo();
    this.applyHistoryChanges();
  }

  redo() {
    if (!this.history || !this.history.hasRedo) return;

    this.history.redo();
    this.applyHistoryChanges();
  }

  onRemove(map: Map) {
    if (!this._controlGroup || !this._controlGroup.parentNode || !this._map) return;

    this._controlGroup.parentNode.removeChild(this._controlGroup);
    this._map = undefined;

    this._historyEvents?.turnOffEvents();
    this._keybindingEvents?.turnOffEvents();
  }

  private addControlButtons() {
    if (!this._controlGroup) return;

    const undoBtn = this.createButton({
      title: `Undo drawing ${this._options.keybindings ? '(Ctrl + Z)' : ''}`,
      className: 'mapbox-gl-draw-undo',
      onActivate: this.undo.bind(this),
    });

    const redoBtn = this.createButton({
      title: `Redo drawing ${this._options.keybindings ? '(Ctrl + Y)' : ''}`,
      className: 'mapbox-gl-draw-redo',
      onActivate: this.redo.bind(this),
    });

    this._controlGroup.append(undoBtn, redoBtn);
  }

  private createButton(options: IControlButtonOptions): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = `${options.className}`;
    button.setAttribute('title', options.title);

    button.addEventListener('click', evt => {
      evt.preventDefault();
      evt.stopPropagation();

      options.onActivate();
    });

    return button;
  }

  private setupHistory() {
    this.history = new HistoryStack();

    if (this._options.listeners) {
      this._historyEvents = new HistoryEvents(this._map!, this.history);
      this._historyEvents.setupEvents();
    }

    if (this._options.keybindings) {
      this._keybindingEvents = new KeybindingEvents(this.history);
      this._keybindingEvents.setupEvents();
    }
  }

  private applyHistoryChanges() {
    if (!this.history) return;

    const { created, updated, deleted } = FeaturesComparator.compare(
      this.history.current,
      this.history.previousHistory,
    );

    if (deleted.length) {
      this._drawControl?.delete(deleted);
    }

    [...created, ...updated].forEach(feature => {
      this._drawControl?.add(feature);
    });
  }
}
