import { toNum } from '../format/toNum.js';

/**
 * 백분율을 계산하는 함수 (value가 total의 몇 퍼센트인지)
 * @param {number|string} value - 계산할 값
 * @param {number|string} total - 전체 값
 * @returns {number} 백분율 (변환 실패 시 NaN)
 */
export function percent(value, total) {
    const numValue = toNum(value);
    const numTotal = toNum(total);

    // 변환 실패 시 NaN 반환
    if (isNaN(numValue) || isNaN(numTotal)) {
        return NaN;
    }

    // 0으로 나누는 경우 처리
    if (numTotal === 0) {
        if (numValue === 0) {
            return NaN; // 0 / 0
        }
        return Infinity; // value / 0
    }

    return (numValue / numTotal) * 100;
}

export default percent;
