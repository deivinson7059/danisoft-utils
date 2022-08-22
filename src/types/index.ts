type EPDFVersion = 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17;
export interface PDFRecryptOptions extends PDFWriterOptions {
  password?: string;
}
interface PDFWriterOptions {
  version?: EPDFVersion;
  log?: string;
  compress?: boolean;

  userPassword?: string;
  ownerPassword?: string;
  userProtectionFlag?: number;
}

export interface apiResponse<T = any> {
  error: boolean;
  data: T;
}

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
