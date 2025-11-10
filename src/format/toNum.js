/**
 * 값을 숫자로 변환하는 함수
 * @param {*} value - 변환할 값
 * @returns {number} 변환된 숫자 (변환 실패 시 NaN)
 */
export function toNum(value) {
    // 이미 숫자인 경우
    if (typeof value === 'number') {
        return value;
    }

    // null이나 undefined인 경우
    if (value === null || value === undefined) {
        return NaN;
    }

    // 불리언인 경우
    if (typeof value === 'boolean') {
        return value ? 1 : 0;
    }

    // 문자열인 경우
    if (typeof value === 'string') {
        // 공백 제거
        const trimmed = value.trim();

        // 빈 문자열인 경우
        if (trimmed === '') {
            return NaN;
        }

        // 쉼표 제거
        const withoutCommas = trimmed.replace(/,/g, '');

        // 숫자로 변환
        const num = Number(withoutCommas);
        return isNaN(num) ? NaN : num;
    }

    // 그 외의 경우 (객체, 배열 등)
    return NaN;
}

export default toNum;
