import { convertLocalToUTC, convertUTCToLocal } from '../src/timezone/index.js';

describe('convertLocalToUTC', () => {
    test('한국 시간(2025-11-24 09:00)을 UTC로 변환', () => {
        const result = convertLocalToUTC('2025-11-24 09:00', 'Asia/Seoul');
        expect(result).toBe('2025-11-24T00:00:00.000Z');
    });

    test('한국 시간(2025-11-24 18:00)을 UTC로 변환', () => {
        const result = convertLocalToUTC('2025-11-24 18:00', 'Asia/Seoul');
        expect(result).toBe('2025-11-24T09:00:00.000Z');
    });

    test('미국 뉴욕 시간을 UTC로 변환 (EST: UTC-5)', () => {
        const result = convertLocalToUTC('2025-11-24 10:00', 'America/New_York');
        expect(result).toBe('2025-11-24T15:00:00.000Z');
    });

    test('초 단위가 포함된 날짜 형식도 처리', () => {
        const result = convertLocalToUTC('2025-11-24 09:00:00', 'Asia/Seoul');
        expect(result).toBe('2025-11-24T00:00:00.000Z');
    });

    test('잘못된 날짜 형식시 에러 반환', () => {
        expect(() => {
            convertLocalToUTC('invalid-date', 'Asia/Seoul');
        }).toThrow('Invalid date format');
    });

    test('잘못된 timezone시 에러 반환', () => {
        expect(() => {
            convertLocalToUTC('2025-11-24 09:00', 'Invalid/Timezone');
        }).toThrow('Invalid timezone');
    });

    test('null이나 undefined 입력시 에러 반환', () => {
        expect(() => {
            convertLocalToUTC(null, 'Asia/Seoul');
        }).toThrow();

        expect(() => {
            convertLocalToUTC('2025-11-24 09:00', null);
        }).toThrow();
    });

    test('빈 문자열 입력시 에러 반환', () => {
        expect(() => {
            convertLocalToUTC('', 'Asia/Seoul');
        }).toThrow();

        expect(() => {
            convertLocalToUTC('2025-11-24 09:00', '');
        }).toThrow();
    });
});

describe('convertUTCToLocal', () => {
    test('UTC 시간을 한국 시간으로 변환', () => {
        const result = convertUTCToLocal('2025-11-24T00:00:00.000Z', 'Asia/Seoul');
        expect(result).toBe('2025-11-24 09:00:00');
    });

    test('UTC 시간을 한국 시간으로 변환 (18:00 케이스)', () => {
        const result = convertUTCToLocal('2025-11-24T09:00:00.000Z', 'Asia/Seoul');
        expect(result).toBe('2025-11-24 18:00:00');
    });

    test('UTC 시간을 미국 뉴욕 시간으로 변환', () => {
        const result = convertUTCToLocal('2025-11-24T15:00:00.000Z', 'America/New_York');
        expect(result).toBe('2025-11-24 10:00:00');
    });

    test('UTC 시간을 유럽 런던 시간으로 변환', () => {
        const result = convertUTCToLocal('2025-11-24T12:00:00.000Z', 'Europe/London');
        expect(result).toBe('2025-11-24 12:00:00');
    });

    test('잘못된 UTC 형식시 에러 반환', () => {
        expect(() => {
            convertUTCToLocal('invalid-utc', 'Asia/Seoul');
        }).toThrow();
    });

    test('잘못된 timezone시 에러 반환', () => {
        expect(() => {
            convertUTCToLocal('2025-11-24T00:00:00.000Z', 'Invalid/Timezone');
        }).toThrow();
    });

    test('null이나 undefined 입력시 에러 반환', () => {
        expect(() => {
            convertUTCToLocal(null, 'Asia/Seoul');
        }).toThrow();

        expect(() => {
            convertUTCToLocal('2025-11-24T00:00:00.000Z', null);
        }).toThrow();
    });

    test('빈 문자열 입력시 에러 반환', () => {
        expect(() => {
            convertUTCToLocal('', 'Asia/Seoul');
        }).toThrow();

        expect(() => {
            convertUTCToLocal('2025-11-24T00:00:00.000Z', '');
        }).toThrow();
    });

    test('경계값 테스트 - 자정 직전', () => {
        const result = convertUTCToLocal('2025-11-23T14:59:59.000Z', 'Asia/Seoul');
        expect(result).toBe('2025-11-23 23:59:59');
    });

    test('경계값 테스트 - 자정', () => {
        const result = convertUTCToLocal('2025-11-23T15:00:00.000Z', 'Asia/Seoul');
        expect(result).toBe('2025-11-24 00:00:00');
    });
});
