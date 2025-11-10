import { add } from '../src/add.js';

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
});
