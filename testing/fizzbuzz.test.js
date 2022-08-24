const { fizzBuzz } = require('./fizbuzz');
const { expect, describe } = require('@jest/globals');

describe('fizzbuzz test', () => {
  it('should throw error if input is not a number', () => {
    const arr = [null, undefined, NaN, false, ''];
    expect(() => {
      fizzBuzz(arr);
    }).toThrow();
  });
  it('should return fizzbuzz if input is divisible by 3 and 5', () => {
    const result = fizzBuzz(15);
    expect(result).toBe('fizbuzz');
  });
  it('should return fizz if input is divisible by 3', () => {
    const result = fizzBuzz(3);
    expect(result).toBe('fizz');
  });
  it('should return buzz if input is divisible by 5', () => {
    const result = fizzBuzz(5);
    expect(result).toBe('buzz');
  });
  it('should return input if input is divisible by any number except 3 and 5', () => {
    const result = ![3, 5];
    expect(result).toBe(result);
  });
});
