export type ParsedQuery = any;

export interface Options {
  parseNull?: boolean;
  parseUndefined?: boolean;
  parseBoolean?: boolean;
  parseNumber?: boolean;
}

export const options_: Options = {
  parseNull: true,
  parseUndefined: true,
  parseBoolean: true,
  parseNumber: true,
};
