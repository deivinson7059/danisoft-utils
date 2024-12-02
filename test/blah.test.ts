import { roundDs } from '../src';

describe('blah', () => {
  it('works', () => {
    expect(roundDs(9999, 50)).toEqual(10000);
  });
});
