import { classes } from './constants';
import HistoryStack from './HistoryStack';
import HistoryEvents from './events/HistoryEvents';
import KeybindingEvents from './events/KeybindingEvents';

import type { IControl, Map } from 'mapbox-gl';
import type { IControlButtonOptions, IControlOptions } from './types';
import FeaturesComparator from './FeaturesComparator';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';

export default class HistoryControl implements IControl {
  private controlGroup?: HTMLElement;
  private map?: Map;
  private history?: HistoryStack;
  private historyEvents?: HistoryEvents;
  private keyBindingEvents?: KeybindingEvents;

  private drawControl: null | MapboxDraw = null;

  private options: IControlOptions = {
    constrols: true,
    keybindings: false,
    listeners: true,
  };

  constructor(drawControl: MapboxDraw, options?: Partial<IControlOptions>) {
    if (options) {
      this.options = Object.assign(this.options, options);
    }
    this.drawControl = drawControl;
  }

  onAdd(map: Map): HTMLElement {
    this.map = map;

    this.initializeHistory();

    this.controlGroup = document.createElement('div');
    this.controlGroup.className = `${classes.CONTROL_BASE} ${classes.CONTROL_GROUP}`;

    if (this.options.constrols) {
      this.createControlButtons();
    }

    return this.controlGroup;
  }

  private createControlButtons() {
    if (!this.controlGroup) return [];

    const undoBtn = this.createControlButton({
      title: `Undo drawing ${this.options.keybindings ? '(Ctrl + z)' : ''}`,
      className: classes.CONTROL_BUTTON_UNDO,
      onActivate: this.undo.bind(this),
    });

    const redoBtn = this.createControlButton({
      title: `Redo drawing ${this.options.keybindings ? '(Ctrl + y)' : ''}`,
      className: classes.CONTROL_BUTTON_REDO,
      onActivate: this.redo.bind(this),
    });

    this.controlGroup.append(undoBtn, redoBtn);
  }

  private createControlButton(options: IControlButtonOptions): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = `${classes.CONTROL_BUTTON} ${options.className}`;
    button.setAttribute('title', options.title);

    button.addEventListener('click', evt => {
      evt.preventDefault();
      evt.stopPropagation();

      options.onActivate();
    });

    return button;
  }

  private initializeHistory() {
    this.history = new HistoryStack();

    if (this.options.listeners) {
      this.historyEvents = new HistoryEvents(this.map!, this.history);
      this.historyEvents.setupListeners();
    }

    if (this.options.keybindings) {
      this.keyBindingEvents = new KeybindingEvents(this.history);
      this.keyBindingEvents.setupEvents();
    }
  }

  private redo() {
    if (!this.history || !this.history.hasRedo) return;

    this.history.redo();
    this.applyHistoryChanges();
  }

  private undo() {
    if (!this.history || !this.history.hasUndo) return;

    this.history.undo();
    this.applyHistoryChanges();
  }

  private applyHistoryChanges() {
    if (!this.history) return;

    const { created, updated, deleted } = FeaturesComparator.compare(
      this.history.current,
      this.history.previousHistory,
    );

    if (deleted.length) {
      this.drawControl?.delete(deleted);
    }

    [...created, ...updated].forEach(feature => {
      this.drawControl?.add(feature);
    });
  }

  onRemove(map: Map): void {
    if (!this.controlGroup || !this.controlGroup.parentNode || !this.map) return;

    this.controlGroup.parentNode.removeChild(this.controlGroup);
    this.map = undefined;

    this.historyEvents?.turnOffListeners();
    this.keyBindingEvents?.turnOffEvents();
  }
}
