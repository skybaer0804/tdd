/**
 * 숫자를 3자리수 콤마가 포함된 문자열로 변환하는 함수
 * @param {number|string} value - 변환할 숫자 또는 문자열
 * @returns {string} 콤마가 포함된 문자열 (변환 실패 시 빈 문자열)
 */
export function toStringComma(value) {
    // null이나 undefined인 경우
    if (value === null || value === undefined) {
        return '';
    }

    // 문자열인 경우
    if (typeof value === 'string') {
        // 빈 문자열인 경우
        if (value.trim() === '') {
            return '';
        }

        // 이미 콤마가 포함된 경우, 콤마 제거 후 다시 처리
        const withoutCommas = value.replace(/,/g, '');
        const num = Number(withoutCommas);

        if (isNaN(num)) {
            return '';
        }

        return formatNumberWithComma(num);
    }

    // 숫자인 경우
    if (typeof value === 'number') {
        if (isNaN(value)) {
            return '';
        }
        return formatNumberWithComma(value);
    }

    // 그 외의 경우
    return '';
}

/**
 * 숫자를 콤마가 포함된 문자열로 포맷팅하는 헬퍼 함수
 * @param {number} num - 포맷팅할 숫자
 * @returns {string} 콤마가 포함된 문자열
 */
function formatNumberWithComma(num) {
    // 숫자를 문자열로 변환
    const parts = num.toString().split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // 정수 부분에 콤마 추가
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 소수점이 있으면 추가
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export default toStringComma;
