type TEvents = { undo: () => void; redo: () => void };
export default class KeybindingEvents {
  private _keysPressed: Record<string, boolean> = {};

  private _events: TEvents;

  constructor(events: TEvents) {
    this._events = events;
  }

  setupEvents() {
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keyup', this.onKeyup.bind(this));
  }

  turnOffEvents() {
    document.removeEventListener('keydown', this.onKeydown.bind(this));
    document.removeEventListener('keyup', this.onKeyup.bind(this));
  }

  private hasKey(key: string) {
    const check = key.split('+');
    const keys = Object.keys(this._keysPressed);

    return check.length === keys.length && check.every(item => keys.includes(item));
  }

  private onKeydown(event: KeyboardEvent) {
    const { ctrlKey, key } = event;

    if (!['Alt', 'Control', 'Shift'].includes(key)) {
      this._keysPressed[key.toLowerCase()] = true;
    }

    if (ctrlKey && this.hasKey('z')) {
      this._events.undo();
    }
    if (ctrlKey && this.hasKey('y')) {
      this._events.redo();
    }
  }

  private onKeyup({ key }: KeyboardEvent) {
    delete this._keysPressed[key.toLowerCase()];
  }
}
