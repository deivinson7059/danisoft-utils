import * as Avatar from 'avatar-initials-generator';
import { avatarConfig, avatarPalette } from '../types/avatar';

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
