import { toStringComma } from '../src/format/toStringComma.js';

describe('toStringComma 함수 테스트', () => {
    test('3자리수 이상의 숫자에 콤마를 추가한다', () => {
        expect(toStringComma(1234)).toBe('1,234');
        expect(toStringComma(12345)).toBe('12,345');
        expect(toStringComma(123456)).toBe('123,456');
        expect(toStringComma(1234567)).toBe('1,234,567');
        expect(toStringComma(12345678)).toBe('12,345,678');
    });

    test('3자리수 미만의 숫자는 콤마 없이 반환한다', () => {
        expect(toStringComma(0)).toBe('0');
        expect(toStringComma(1)).toBe('1');
        expect(toStringComma(12)).toBe('12');
        expect(toStringComma(123)).toBe('123');
    });

    test('음수에도 콤마를 추가한다', () => {
        expect(toStringComma(-1234)).toBe('-1,234');
        expect(toStringComma(-123456)).toBe('-123,456');
        expect(toStringComma(-1)).toBe('-1');
    });

    test('소수점이 있는 숫자에도 콤마를 추가한다', () => {
        expect(toStringComma(1234.56)).toBe('1,234.56');
        expect(toStringComma(123456.789)).toBe('123,456.789');
        expect(toStringComma(0.5)).toBe('0.5');
        expect(toStringComma(-1234.56)).toBe('-1,234.56');
    });

    test('문자열 숫자를 변환한다', () => {
        expect(toStringComma('1234')).toBe('1,234');
        expect(toStringComma('123456')).toBe('123,456');
        expect(toStringComma('-1234')).toBe('-1,234');
    });

    test('이미 콤마가 포함된 문자열도 처리한다', () => {
        expect(toStringComma('1,234')).toBe('1,234');
        expect(toStringComma('12,345')).toBe('12,345');
    });

    test('빈 문자열이나 유효하지 않은 값은 빈 문자열을 반환한다', () => {
        expect(toStringComma('')).toBe('');
        expect(toStringComma('abc')).toBe('');
        expect(toStringComma(null)).toBe('');
        expect(toStringComma(undefined)).toBe('');
    });
});
