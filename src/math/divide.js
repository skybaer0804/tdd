import { toNum } from '../format/toNum.js';

/**
 * 나눗셈 함수
 * @param {number|string} dividend - 나뉘는 수 (피제수) (문자열도 자동 변환)
 * @param {number|string} divisor - 나누는 수 (제수) (문자열도 자동 변환)
 * @returns {number} 나눗셈의 결과 (변환 실패 시 NaN)
 */
export function divide(dividend, divisor) {
    const numDividend = toNum(dividend);
    const numDivisor = toNum(divisor);

    // 변환 실패 시 NaN 반환
    if (isNaN(numDividend) || isNaN(numDivisor)) {
        return NaN;
    }

    return numDividend / numDivisor;
}

export default divide;
