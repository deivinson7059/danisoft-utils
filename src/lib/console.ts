import colors from 'colors/safe';
export const greenBright = (start: string, text: string): void => {
  console.log(`${start} ${colors.green(text)}`);
};

export const redBright = (start: string, text: string): void => {
  console.log(`${start} ${colors.red(text)}`);
};

export const yellowBright = (start: string, text: string): void => {
  console.log(`${start} ${colors.yellow(text)}`);
};

export const blueBright = (start: string, text: string): void => {
  console.log(`${start} ${colors.blue(text)}`);
};

export const magentaBright = (start: string, text: string): void => {
  console.log(`${start} ${colors.magenta(text)}`);
};

export const cyanBright = (start: string, text: string): void => {
  console.log(`${start} ${colors.cyan(text)}`);
};

export const whiteBright = (start: string, text: string): void => {
  console.log(`${start} ${colors.white(text)}`);
};
