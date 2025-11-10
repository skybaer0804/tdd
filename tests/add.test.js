import { add } from '../src/math/add.js';

describe('add 함수 테스트', () => {
    test('두 양수를 더하면 올바른 결과를 반환한다', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(10, 20)).toBe(30);
    });

    test('음수를 더할 수 있다', () => {
        expect(add(-5, 3)).toBe(-2);
        expect(add(-10, -20)).toBe(-30);
    });

    test('0을 더할 수 있다', () => {
        expect(add(0, 5)).toBe(5);
        expect(add(5, 0)).toBe(5);
        expect(add(0, 0)).toBe(0);
    });

    test('소수점을 더할 수 있다', () => {
        expect(add(1.5, 2.3)).toBeCloseTo(3.8);
        expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('큰 숫자를 더할 수 있다', () => {
        expect(add(1000000, 2000000)).toBe(3000000);
    });

    test('문자열 숫자를 자동으로 변환하여 더한다', () => {
        expect(add('1', '2')).toBe(3);
        expect(add('10', '20')).toBe(30);
        expect(add('1.5', '2.3')).toBeCloseTo(3.8);
    });

    test('숫자로 변환할 수 없는 문자열은 NaN을 반환한다', () => {
        expect(add('이', '가')).toBeNaN();
        expect(add('abc', 'def')).toBeNaN();
        expect(add('hello', 1)).toBeNaN();
    });

    test('null이나 undefined는 NaN을 반환한다', () => {
        expect(add(null, 1)).toBeNaN();
        expect(add(1, null)).toBeNaN();
        expect(add(undefined, 1)).toBeNaN();
        expect(add(1, undefined)).toBeNaN();
    });

    test('공백이 포함된 문자열 숫자는 변환하여 더한다', () => {
        expect(add(' 1 ', ' 2 ')).toBe(3);
        expect(add('10', ' 20 ')).toBe(30);
    });

    test('쉼표가 포함된 문자열 숫자는 변환하여 더한다', () => {
        expect(add('1,000', '2,000')).toBe(3000);
        expect(add('10,000', '20,000')).toBe(30000);
    });
});
