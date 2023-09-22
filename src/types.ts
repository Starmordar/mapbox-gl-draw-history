export type TControlNames = 'undo' | 'redo';

export interface IControlOptions {
  listeners?: boolean;
  constrols?: boolean;
  keybindings?: boolean;
}

export interface IControlButtonOptions {
  title: string;
  className: string;
  onActivate: () => void;
}
