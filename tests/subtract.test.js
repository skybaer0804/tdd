import { subtract } from '../src/math/subtract.js';

describe('subtract 함수 테스트', () => {
    test('두 양수를 빼면 올바른 결과를 반환한다', () => {
        expect(subtract(5, 3)).toBe(2);
        expect(subtract(20, 10)).toBe(10);
    });

    test('음수를 뺄 수 있다', () => {
        expect(subtract(3, -5)).toBe(8);
        expect(subtract(-5, 3)).toBe(-8);
        expect(subtract(-10, -20)).toBe(10);
    });

    test('0을 뺄 수 있다', () => {
        expect(subtract(5, 0)).toBe(5);
        expect(subtract(0, 5)).toBe(-5);
        expect(subtract(0, 0)).toBe(0);
    });

    test('소수점을 뺄 수 있다', () => {
        expect(subtract(3.8, 2.3)).toBeCloseTo(1.5);
        expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });

    test('큰 숫자를 뺄 수 있다', () => {
        expect(subtract(3000000, 2000000)).toBe(1000000);
    });

    test('첫 번째 숫자가 두 번째 숫자보다 작으면 음수를 반환한다', () => {
        expect(subtract(3, 5)).toBe(-2);
        expect(subtract(10, 20)).toBe(-10);
    });

    test('문자열 숫자를 자동으로 변환하여 뺀다', () => {
        expect(subtract('5', '3')).toBe(2);
        expect(subtract('20', '10')).toBe(10);
        expect(subtract('3.8', '2.3')).toBeCloseTo(1.5);
    });

    test('숫자로 변환할 수 없는 문자열은 NaN을 반환한다', () => {
        expect(subtract('이', '가')).toBeNaN();
        expect(subtract('abc', 'def')).toBeNaN();
    });

    test('null이나 undefined는 NaN을 반환한다', () => {
        expect(subtract(null, 1)).toBeNaN();
        expect(subtract(1, null)).toBeNaN();
        expect(subtract(undefined, 1)).toBeNaN();
    });
});
