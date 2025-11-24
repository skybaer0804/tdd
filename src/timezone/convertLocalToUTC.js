import { fromZonedTime } from 'date-fns-tz';
import { isValidTimezone } from './isValidTimezone.js';

/**
 * 로컬 시간을 UTC로 변환
 * @param {string} localDateTime - 로컬 시간 (형식: 'YYYY-MM-DD HH:mm' 또는 'YYYY-MM-DD HH:mm:ss')
 * @param {string} timezone - 타임존 (예: 'Asia/Seoul')
 * @returns {string} UTC ISO String (형식: '2025-11-24T00:00:00.000Z')
 * @throws {Error} 날짜 형식 또는 타임존이 유효하지 않음
 */
export function convertLocalToUTC(localDateTime, timezone) {
    try {
        // 입력값 검증
        if (!localDateTime || typeof localDateTime !== 'string' || localDateTime.trim() === '') {
            throw new Error('Invalid date format');
        }

        if (!timezone || typeof timezone !== 'string' || timezone.trim() === '') {
            throw new Error('Invalid timezone');
        }

        // 타임존 유효성 검증
        if (!isValidTimezone(timezone)) {
            throw new Error('Invalid timezone');
        }

        // 날짜 형식 검증
        const datePattern = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}(:\d{2})?$/;
        if (!datePattern.test(localDateTime)) {
            throw new Error('Invalid date format');
        }

        const localDate = new Date(localDateTime);
        if (isNaN(localDate.getTime())) {
            throw new Error('Invalid date');
        }

        const utcDate = fromZonedTime(localDate, timezone);
        return utcDate.toISOString();
    } catch (error) {
        if (error instanceof Error && error.message.includes('Invalid timezone')) {
            throw new Error('Invalid timezone');
        }
        if (error instanceof Error) {
            throw new Error(`convertLocalToUTC error: ${error.message}`);
        }
        throw error;
    }
}

export default convertLocalToUTC;

