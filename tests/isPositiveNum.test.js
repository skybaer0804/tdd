import { isPositiveNum } from '../src/validate/isPositiveNum.js';

describe('isPositiveNum 함수 테스트', () => {
    test('0을 허용한다', () => {
        expect(isPositiveNum(0)).toBe(true);
    });

    test('양의 정수를 허용한다', () => {
        expect(isPositiveNum(1)).toBe(true);
        expect(isPositiveNum(2)).toBe(true);
        expect(isPositiveNum(100)).toBe(true);
        expect(isPositiveNum(999999)).toBe(true);
    });

    test('음수는 false를 반환한다', () => {
        expect(isPositiveNum(-1)).toBe(false);
        expect(isPositiveNum(-100)).toBe(false);
    });

    test('소수점은 false를 반환한다', () => {
        expect(isPositiveNum(1.5)).toBe(false);
        expect(isPositiveNum(0.5)).toBe(false);
        expect(isPositiveNum(3.14)).toBe(false);
    });

    test('문자열은 false를 반환한다', () => {
        expect(isPositiveNum('0')).toBe(false);
        expect(isPositiveNum('1')).toBe(false);
        expect(isPositiveNum('123')).toBe(false);
        expect(isPositiveNum('abc')).toBe(false);
    });

    test('null은 false를 반환한다', () => {
        expect(isPositiveNum(null)).toBe(false);
    });

    test('undefined는 false를 반환한다', () => {
        expect(isPositiveNum(undefined)).toBe(false);
    });

    test('배열은 false를 반환한다', () => {
        expect(isPositiveNum([])).toBe(false);
        expect(isPositiveNum([1, 2, 3])).toBe(false);
    });

    test('객체는 false를 반환한다', () => {
        expect(isPositiveNum({})).toBe(false);
        expect(isPositiveNum({ a: 1 })).toBe(false);
    });

    test('불리언은 false를 반환한다', () => {
        expect(isPositiveNum(true)).toBe(false);
        expect(isPositiveNum(false)).toBe(false);
    });

    test('NaN은 false를 반환한다', () => {
        expect(isPositiveNum(NaN)).toBe(false);
    });

    test('Infinity는 false를 반환한다', () => {
        expect(isPositiveNum(Infinity)).toBe(false);
        expect(isPositiveNum(-Infinity)).toBe(false);
    });
});
