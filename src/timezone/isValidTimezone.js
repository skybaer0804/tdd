/**
 * 타임존이 유효한지 검사
 * @param {string} timezone - 검사할 타임존
 * @returns {boolean} 유효 여부
 */
export function isValidTimezone(timezone) {
    if (typeof timezone !== 'string' || timezone.trim() === '') {
        return false;
    }

    try {
        // Intl API를 이용한 타임존 검증
        Intl.DateTimeFormat(undefined, { timeZone: timezone });
        return true;
    } catch {
        return false;
    }
}

export default isValidTimezone;
