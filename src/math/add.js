import { toNum } from '../format/toNum.js';

/**
 * 두 숫자를 더하는 함수
 * @param {number|string} a - 첫 번째 숫자 (문자열도 자동 변환)
 * @param {number|string} b - 두 번째 숫자 (문자열도 자동 변환)
 * @returns {number} 두 숫자의 합 (변환 실패 시 NaN)
 */
export function add(a, b) {
    const numA = toNum(a);
    const numB = toNum(b);

    // 변환 실패 시 NaN 반환
    if (isNaN(numA) || isNaN(numB)) {
        return NaN;
    }

    return numA + numB;
}

export default add;
