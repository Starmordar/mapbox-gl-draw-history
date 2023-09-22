import HistoryStack from '../HistoryStack';

export default class KeybindingEvents {
  private _keysPressed: Record<string, boolean> = {};
  private _history: HistoryStack;

  constructor(history: HistoryStack) {
    this._history = history;
  }

  public setupEvents() {
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keyup', this.onKeyup.bind(this));
  }

  public turnOffEvents() {
    document.removeEventListener('keydown', this.onKeydown.bind(this));
    document.removeEventListener('keyup', this.onKeyup.bind(this));
  }

  private hasKey(key: string) {
    const check = key.split('+');
    const keys = Object.keys(this._keysPressed);

    if (check.length === keys.length && check.every(item => keys.includes(item))) return true;
    return false;
  }

  private onKeydown(event: KeyboardEvent) {
    const { ctrlKey, key } = event;

    if (!['Alt', 'Control', 'Shift'].includes(key)) this._keysPressed[key.toLowerCase()] = true;
    if (ctrlKey && this.hasKey('z')) {
      this._history.hasUndo && this._history.undo();
    }
    if (ctrlKey && this.hasKey('y')) {
      this._history.hasRedo && this._history.redo();
    }
  }

  private onKeyup({ key }: KeyboardEvent) {
    delete this._keysPressed[key.toLowerCase()];
  }
}
