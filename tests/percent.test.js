import { percent } from '../src/math/percent.js';

describe('percent 함수 테스트', () => {
    test('두 숫자의 백분율을 계산한다', () => {
        expect(percent(50, 100)).toBe(50);
        expect(percent(25, 100)).toBe(25);
        expect(percent(75, 100)).toBe(75);
    });

    test('소수점이 있는 백분율을 계산한다', () => {
        expect(percent(1, 3)).toBe(33.3); // decimals 기본값 1 적용
        expect(percent(1, 3, 10)).toBeCloseTo(33.3333333333); // 소수점 10자리로 확인
        expect(percent(1, 4)).toBe(25);
        expect(percent(1, 8)).toBe(12.5);
    });

    test('0을 처리한다', () => {
        expect(percent(0, 100)).toBe(0);
        expect(percent(50, 0)).toBe(Infinity);
        expect(percent(0, 0)).toBeNaN();
    });

    test('음수를 처리한다', () => {
        expect(percent(-50, 100)).toBe(-50);
        expect(percent(50, -100)).toBe(-50);
        expect(percent(-50, -100)).toBe(50);
    });

    test('큰 숫자를 처리한다', () => {
        expect(percent(1000000, 2000000)).toBe(50);
        expect(percent(500000, 1000000)).toBe(50);
    });

    test('문자열 숫자를 자동으로 변환하여 계산한다', () => {
        expect(percent('50', '100')).toBe(50);
        expect(percent('25', '100')).toBe(25);
        expect(percent('1', '4')).toBe(25);
    });

    test('공백이 포함된 문자열 숫자를 변환하여 계산한다', () => {
        expect(percent(' 50 ', ' 100 ')).toBe(50);
        expect(percent('25', ' 100 ')).toBe(25);
    });

    test('쉼표가 포함된 문자열 숫자를 변환하여 계산한다', () => {
        expect(percent('1,000', '2,000')).toBe(50);
        expect(percent('500', '1,000')).toBe(50);
    });

    test('숫자로 변환할 수 없는 문자열은 NaN을 반환한다', () => {
        expect(percent('이', '가')).toBeNaN();
        expect(percent('abc', 'def')).toBeNaN();
        expect(percent('hello', 100)).toBeNaN();
    });

    test('null이나 undefined는 NaN을 반환한다', () => {
        expect(percent(null, 100)).toBeNaN();
        expect(percent(50, null)).toBeNaN();
        expect(percent(undefined, 100)).toBeNaN();
        expect(percent(50, undefined)).toBeNaN();
    });

    test('100%를 초과하는 경우를 처리한다', () => {
        expect(percent(150, 100)).toBe(150);
        expect(percent(200, 100)).toBe(200);
    });

    test('소수점 값과 정수를 조합하여 계산한다', () => {
        expect(percent(0.5, 1)).toBe(50);
        expect(percent(1.5, 3)).toBe(50);
        expect(percent(2.5, 5)).toBe(50);
    });

    test('decimals 파라미터로 소수점 자릿수를 제어한다', () => {
        expect(percent(1, 3, 0)).toBe(33);
        expect(percent(1, 3, 1)).toBe(33.3);
        expect(percent(1, 3, 2)).toBe(33.33);
        expect(percent(1, 3, 3)).toBe(33.333);
        expect(percent(1, 4, 0)).toBe(25);
        expect(percent(1, 4, 2)).toBe(25);
    });

    test('mode 파라미터로 반올림 방식을 제어한다', () => {
        // round 모드 (기본값)
        expect(percent(1, 3, 1, 'round')).toBe(33.3);
        expect(percent(1, 3, 2, 'round')).toBe(33.33);

        // floor 모드 (내림)
        expect(percent(1, 3, 1, 'floor')).toBe(33.3);
        expect(percent(1, 3, 2, 'floor')).toBe(33.33);

        // ceil 모드 (올림)
        expect(percent(1, 3, 1, 'ceil')).toBe(33.4);
        expect(percent(1, 3, 2, 'ceil')).toBe(33.34);
    });

    test('decimals와 mode를 함께 사용한다', () => {
        expect(percent(1, 3, 0, 'round')).toBe(33);
        expect(percent(1, 3, 0, 'floor')).toBe(33);
        expect(percent(1, 3, 0, 'ceil')).toBe(34);

        expect(percent(2, 3, 1, 'round')).toBe(66.7);
        expect(percent(2, 3, 1, 'floor')).toBe(66.6);
        expect(percent(2, 3, 1, 'ceil')).toBe(66.7);
    });

    test('Infinity와 NaN을 올바르게 처리한다', () => {
        expect(percent(Infinity, 100)).toBe(Infinity);
        expect(percent(100, Infinity)).toBeNaN();
        expect(percent(Infinity, Infinity)).toBeNaN();
    });
});
