export type TControlNames = 'undo' | 'redo';

export interface IControlOptions {
  constrols: Record<TControlNames, boolean>;
  keybindings: boolean;
}
