const { expect, describe } = require('@jest/globals');
const { PosNeg, str, arr, obj, expectionTest } = require('./number');

describe('positive-negative-zero', () => {
  it('should return positive for positive', () => {
    const result = PosNeg(1);
    expect(result).toBe(1);
  });

  it('should return positive for negative', () => {
    const result = PosNeg(-1);
    expect(result).toBe(1);
  });

  it('should return zero for zero\n', () => {
    const result = PosNeg(0);
    expect(result).toBe(0);
  });
});

describe('Test string', () => {
  it('should return hello message\n', () => {
    const result = str('Ahim mudbari');
    // expect(result).toContain('Ahim');
    expect(result).toMatch(/aHIM/i);
  });
});

describe('Array test', () => {
  it('should return array of movies\n', () => {
    const result = arr();
    // expect(result).not.toBeNull();
    // expect(result).toContain('GOT', 'Rio', 'Harry potter');

    // expect(result[0]).toContain('GOT');
    // expect(result[1]).toBe('Rio');
    // expect(result[2]).toMatch(/harry potter/i);
    // expect(result.length).toBe(3);

    expect(result).toEqual(
      expect.arrayContaining(['GOT', 'Rio', 'Harry potter'])
    );
  });
});

describe('Oject Test', () => {
  it('should return oject of GOT', () => {
    const result = obj(1);

    // expect(result).toEqual({
    //   characterId: 1,
    //   house: 'Stark',
    //   character: 'jon snow',
    //   age: 27,
    // });

    expect(result).toMatchObject({
      id: 1,
      house: 'Stark',
      character: 'jon snow',
      age: 27,
    });

    // expect(result).toHaveProperty('id', 27);
  });
});

// describe('Exception test', () => {
//   it('Should throw error if no username is provided', () => {
//     const arr = [null, NaN, '', undefined, 0, false];
//     arr.forEach((element) => {
//       expect(() => {
//         expectionTest(element);
//       }).toThrow();
//     });
//   });

//   it('should register user if everything is valid', () => {
//     const result = expectionTest('Ahim');
//     expect(result).toMatchObject({ username: 'Ahim' });
//     expect(result.id).toBeGreaterThan(0);
//   });
// });
