export type TControlNames = 'undo' | 'redo';

export interface IControlOptions {
  constrols?: boolean;
  keybindings?: boolean;
}

export interface IControlButtonOptions {
  title: string;
  className: string;
  onActivate: () => void;
}
