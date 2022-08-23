import * as Avatar from 'avatar-initials-generator';
import { avatarConfig, avatarPalette } from '../types/avatar';

/**
 * @description Generate an avatar image
 *
 * @param {string} name - Name of the user
 * @param {avatarConfig} config? - Configuration for the avatar
 * @returns {Buffer }
 */

export const generateAvatar = (name: string, config?: avatarConfig): Buffer => {
  let _palette: string[] = getPalette(config?.palette);

  let _width: number = config?.width ? config?.width : 300;

  let _maxLetters: number = config?.maxLetters ? config?.maxLetters : 2;

  const avatar_buffer: Buffer = Avatar.generate(name, {
    width: _width,
    palette: _palette,
    maxLetters: _maxLetters,
    fontProportion: 0.6,
  });

  const b64: string = Buffer.from(avatar_buffer).toString('base64');

  var img: Buffer = Buffer.from(b64, 'base64');

  return img;
};

/**
 * @description Get the palette for the avatar
 *
 * @param {avatarPalette} palette - Palette for the avatar
 * @returns {string[]}
 */
export const getPalette = (palette: avatarPalette = 'red'): string[] => {
  switch (palette) {
    case 'red':
      return ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000'];
    case 'blue':
      return ['#0000ff', '#0000ff', '#0000ff', '#0000ff', '#0000ff'];
    case 'green':
      return ['#00ff00', '#00ff00', '#00ff00', '#00ff00', '#00ff00'];
    case 'yellow':
      return ['#ffff00', '#ffff00', '#ffff00', '#ffff00', '#ffff00'];
    case 'purple':
      return ['#ff00ff', '#ff00ff', '#ff00ff', '#ff00ff', '#ff00ff'];
    case 'orange':
      return ['#ffa500', '#ffa500', '#ffa500', '#ffa500', '#ffa500'];
    case 'pink':
      return ['#ff69b4', '#ff69b4', '#ff69b4', '#ff69b4', '#ff69b4'];
    case 'black':
      return ['#000000', '#000000', '#000000', '#000000', '#000000'];
    default:
      return ['#d97706', '#4f46e5', '#9333ea'];
  }
};

/**
 * @description to arraybuffer from Buffer
 *
 * @param {Buffer} buf - ArrayBuffer
 * @returns {ArrayBuffer}
 */
export const toArrayBuffer = (buf: Buffer): ArrayBuffer => {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
};

/**
 * @description to buber from arraybuffer
 *
 * @param {ArrayBuffer} ab - ArrayBuffer
 * @returns {Buffer}
 */
export const toBuffer = (ab: ArrayBuffer): Buffer => {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
};
