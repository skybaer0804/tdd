import { isNum } from '../src/validate/isNum.js';

describe('isNum 함수 테스트', () => {
    test('숫자면 true를 반환한다', () => {
        expect(isNum(0)).toBe(true);
        expect(isNum(1)).toBe(true);
        expect(isNum(-1)).toBe(true);
        expect(isNum(100)).toBe(true);
        expect(isNum(3.14)).toBe(true);
        expect(isNum(-3.14)).toBe(true);
    });

    test('문자열이면 false를 반환한다', () => {
        expect(isNum('0')).toBe(false);
        expect(isNum('123')).toBe(false);
        expect(isNum('3.14')).toBe(false);
        expect(isNum('abc')).toBe(false);
        expect(isNum('')).toBe(false);
    });

    test('null이면 false를 반환한다', () => {
        expect(isNum(null)).toBe(false);
    });

    test('undefined이면 false를 반환한다', () => {
        expect(isNum(undefined)).toBe(false);
    });

    test('배열이면 false를 반환한다', () => {
        expect(isNum([])).toBe(false);
        expect(isNum([1, 2, 3])).toBe(false);
    });

    test('객체이면 false를 반환한다', () => {
        expect(isNum({})).toBe(false);
        expect(isNum({ a: 1 })).toBe(false);
    });

    test('불리언이면 false를 반환한다', () => {
        expect(isNum(true)).toBe(false);
        expect(isNum(false)).toBe(false);
    });

    test('NaN이면 false를 반환한다', () => {
        expect(isNum(NaN)).toBe(false);
    });

    test('Infinity는 true를 반환한다', () => {
        expect(isNum(Infinity)).toBe(true);
        expect(isNum(-Infinity)).toBe(true);
    });
});
