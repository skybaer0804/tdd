import { toNum } from '../src/format/toNum.js';

describe('toNum 함수 테스트', () => {
    test('문자열 숫자를 숫자로 변환한다', () => {
        expect(toNum('123')).toBe(123);
        expect(toNum('0')).toBe(0);
        expect(toNum('999')).toBe(999);
    });

    test('공백이 포함된 문자열을 숫자로 변환한다', () => {
        expect(toNum(' 123 ')).toBe(123);
        expect(toNum('  456  ')).toBe(456);
    });

    test('쉼표가 포함된 문자열을 숫자로 변환한다', () => {
        expect(toNum('12,340')).toBe(12340);
        expect(toNum('1,234,567')).toBe(1234567);
        expect(toNum(' 12,340 ')).toBe(12340);
    });

    test('소수점이 포함된 문자열을 숫자로 변환한다', () => {
        expect(toNum('123.45')).toBe(123.45);
        expect(toNum('0.5')).toBe(0.5);
        expect(toNum('12,340.56')).toBe(12340.56);
    });

    test('음수 문자열을 숫자로 변환한다', () => {
        expect(toNum('-123')).toBe(-123);
        expect(toNum('-12,340')).toBe(-12340);
        expect(toNum(' -123 ')).toBe(-123);
    });

    test('이미 숫자인 경우 그대로 반환한다', () => {
        expect(toNum(123)).toBe(123);
        expect(toNum(0)).toBe(0);
        expect(toNum(-123)).toBe(-123);
        expect(toNum(123.45)).toBe(123.45);
    });

    test('변환할 수 없는 문자열은 NaN을 반환한다', () => {
        expect(toNum('abc')).toBeNaN();
        expect(toNum('hello')).toBeNaN();
        expect(toNum('')).toBeNaN();
        expect(toNum('   ')).toBeNaN();
    });

    test('null이나 undefined는 NaN을 반환한다', () => {
        expect(toNum(null)).toBeNaN();
        expect(toNum(undefined)).toBeNaN();
    });

    test('객체나 배열은 NaN을 반환한다', () => {
        expect(toNum({})).toBeNaN();
        expect(toNum([])).toBeNaN();
        expect(toNum([1, 2, 3])).toBeNaN();
    });

    test('불리언은 숫자로 변환한다', () => {
        expect(toNum(true)).toBe(1);
        expect(toNum(false)).toBe(0);
    });
});
