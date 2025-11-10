import { pow } from '../src/math/pow.js';

describe('pow 함수 테스트', () => {
    test('양수의 거듭제곱을 계산한다', () => {
        expect(pow(2, 3)).toBe(8);
        expect(pow(3, 2)).toBe(9);
        expect(pow(5, 4)).toBe(625);
    });

    test('밑이 0이면 결과는 0이다', () => {
        expect(pow(0, 5)).toBe(0);
        expect(pow(0, 100)).toBe(0);
    });

    test('지수가 0이면 결과는 1이다', () => {
        expect(pow(5, 0)).toBe(1);
        expect(pow(10, 0)).toBe(1);
        expect(pow(0, 0)).toBe(1);
    });

    test('지수가 1이면 결과는 밑과 같다', () => {
        expect(pow(5, 1)).toBe(5);
        expect(pow(10, 1)).toBe(10);
    });

    test('음수의 거듭제곱을 계산한다', () => {
        expect(pow(-2, 2)).toBe(4);
        expect(pow(-2, 3)).toBe(-8);
        expect(pow(-3, 4)).toBe(81);
    });

    test('소수점의 거듭제곱을 계산한다', () => {
        expect(pow(2.5, 2)).toBeCloseTo(6.25);
        expect(pow(1.5, 3)).toBeCloseTo(3.375);
    });

    test('큰 숫자의 거듭제곱을 계산한다', () => {
        expect(pow(10, 6)).toBe(1000000);
        expect(pow(2, 10)).toBe(1024);
    });

    test('문자열 숫자를 자동으로 변환하여 거듭제곱을 계산한다', () => {
        expect(pow('2', '3')).toBe(8);
        expect(pow('3', '2')).toBe(9);
        expect(pow('2.5', '2')).toBeCloseTo(6.25);
    });

    test('숫자로 변환할 수 없는 문자열은 NaN을 반환한다', () => {
        expect(pow('이', '가')).toBeNaN();
        expect(pow('abc', 'def')).toBeNaN();
    });

    test('null이나 undefined는 NaN을 반환한다', () => {
        expect(pow(null, 1)).toBeNaN();
        expect(pow(1, null)).toBeNaN();
        expect(pow(undefined, 1)).toBeNaN();
    });
});
