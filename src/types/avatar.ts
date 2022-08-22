export interface avatarParams {
  uid: string;
}

export type avatarPalette =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'black'
  | 'none';

export interface avatarConfig {
  width?: number;
  palette?: avatarPalette;
  maxLetters?: number;
}
