import { toNum } from '../format/toNum.js';

/**
 * 거듭제곱 함수 (a의 b제곱)
 * @param {number|string} base - 밑 (문자열도 자동 변환)
 * @param {number|string} exponent - 지수 (문자열도 자동 변환)
 * @returns {number} base의 exponent제곱 (변환 실패 시 NaN)
 */
export function pow(base, exponent) {
    const numBase = toNum(base);
    const numExponent = toNum(exponent);

    // 변환 실패 시 NaN 반환
    if (isNaN(numBase) || isNaN(numExponent)) {
        return NaN;
    }

    return Math.pow(numBase, numExponent);
}

export default pow;
