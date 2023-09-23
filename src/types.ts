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
