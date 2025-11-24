import { formatInTimeZone } from 'date-fns-tz';
import { isValidTimezone } from './isValidTimezone.js';

/**
 * UTC 시간을 특정 타임존의 로컬 시간으로 변환
 * @param {string} utcDateTime - UTC 시간 (ISO String)
 * @param {string} timezone - 타임존 (예: 'Asia/Seoul')
 * @returns {string} 로컬 시간 (형식: 'YYYY-MM-DD HH:mm:ss')
 * @throws {Error} UTC 형식 또는 타임존이 유효하지 않음
 */
export function convertUTCToLocal(utcDateTime, timezone) {
    try {
        // 입력값 검증
        if (!utcDateTime || typeof utcDateTime !== 'string' || utcDateTime.trim() === '') {
            throw new Error('Invalid UTC datetime');
        }

        if (!timezone || typeof timezone !== 'string' || timezone.trim() === '') {
            throw new Error('Invalid timezone');
        }

        // 타임존 유효성 검증
        if (!isValidTimezone(timezone)) {
            throw new Error('Invalid timezone');
        }

        const date = new Date(utcDateTime);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid UTC datetime');
        }

        return formatInTimeZone(date, timezone, 'yyyy-MM-dd HH:mm:ss');
    } catch (error) {
        if (error instanceof Error && error.message.includes('Invalid timezone')) {
            throw new Error('Invalid timezone');
        }
        if (error instanceof Error) {
            throw new Error(`convertUTCToLocal error: ${error.message}`);
        }
        throw error;
    }
}

export default convertUTCToLocal;

