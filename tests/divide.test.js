import { divide } from '../src/math/divide.js';

describe('divide 함수 테스트', () => {
    test('두 양수를 나누면 올바른 결과를 반환한다', () => {
        expect(divide(10, 2)).toBe(5);
        expect(divide(20, 4)).toBe(5);
        expect(divide(15, 3)).toBe(5);
    });

    test('음수를 나눌 수 있다', () => {
        expect(divide(-10, 2)).toBe(-5);
        expect(divide(10, -2)).toBe(-5);
        expect(divide(-10, -2)).toBe(5);
    });

    test('0을 나눌 수 있다 (0 / a = 0)', () => {
        expect(divide(0, 5)).toBe(0);
        expect(divide(0, -5)).toBeCloseTo(0); // JavaScript에서 0 / -5는 -0을 반환
    });

    test('소수점 나눗셈을 계산한다', () => {
        expect(divide(7.5, 2.5)).toBeCloseTo(3);
        expect(divide(1.5, 0.5)).toBeCloseTo(3);
        expect(divide(10, 3)).toBeCloseTo(3.3333333333333335);
    });

    test('큰 숫자를 나눌 수 있다', () => {
        expect(divide(1000000, 2)).toBe(500000);
        expect(divide(2000000, 1000)).toBe(2000);
    });

    test('0으로 나누면 Infinity를 반환한다', () => {
        expect(divide(10, 0)).toBe(Infinity);
        expect(divide(-10, 0)).toBe(-Infinity);
        expect(divide(0, 0)).toBeNaN();
    });

    test('나누는 수가 나뉘는 수보다 크면 1보다 작은 값을 반환한다', () => {
        expect(divide(3, 5)).toBeCloseTo(0.6);
        expect(divide(1, 2)).toBeCloseTo(0.5);
    });

    test('문자열 숫자를 자동으로 변환하여 나눈다', () => {
        expect(divide('10', '2')).toBe(5);
        expect(divide('20', '4')).toBe(5);
        expect(divide('7.5', '2.5')).toBeCloseTo(3);
    });

    test('숫자로 변환할 수 없는 문자열은 NaN을 반환한다', () => {
        expect(divide('이', '가')).toBeNaN();
        expect(divide('abc', 'def')).toBeNaN();
    });

    test('null이나 undefined는 NaN을 반환한다', () => {
        expect(divide(null, 1)).toBeNaN();
        expect(divide(1, null)).toBeNaN();
        expect(divide(undefined, 1)).toBeNaN();
    });
});
