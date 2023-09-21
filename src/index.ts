import { classes } from './constants';

import type { IControl, Map } from 'mapbox-gl';
import type { IControlButtonOptions, IControlOptions } from './types';

export default class MapboxDrawHistory implements IControl {
  private controlGroup?: HTMLElement;
  private map?: Map;

  private options: IControlOptions = {
    constrols: true,
    keybindings: false,
  };

  constructor(options?: Partial<IControlOptions>) {
    if (options) {
      this.options = Object.assign(this.options, options);
    }
  }

  onAdd(map: Map): HTMLElement {
    this.map = map;
    this.controlGroup = document.createElement('div');
    this.controlGroup.className = `${classes.CONTROL_BASE} ${classes.CONTROL_GROUP}`;
    const btns = this.createControlButtons();

    this.controlGroup.append(...btns);
    return this.controlGroup;
  }

  private createControlButtons(): HTMLButtonElement[] {
    if (!this.controlGroup) return [];

    const undoBtn = this.createControlButton({
      title: 'Undo drawing',
      className: classes.CONTROL_BUTTON_UNDO,
      onActivate: this.undo,
    });

    const redoBtn = this.createControlButton({
      title: 'Redo drawing',
      className: classes.CONTROL_BUTTON_REDO,
      onActivate: this.redo,
    });

    return [undoBtn, redoBtn];
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

  private undo() {
    console.log('undo');
  }

  private redo() {
    console.log('redo');
  }

  onRemove(map: Map): void {
    if (!this.controlGroup || !this.controlGroup.parentNode || !this.map) return;

    this.controlGroup.parentNode.removeChild(this.controlGroup);
    this.map = undefined;
  }
}
