import { toNum } from '../format/toNum.js';

/**
 * 백분율을 계산하는 함수 (value가 total의 몇 퍼센트인지)
 * @param {number|string} value - 계산할 값
 * @param {number|string} total - 전체 값
 * @param {number} decimals - 소수점 자릿수 (기본값: 1)
 * @param {string} mode - 반올림 방식: 'round' (기본값), 'floor', 'ceil'
 * @returns {number} 백분율 (변환 실패 시 NaN)
 */
export function percent(value, total, decimals = 1, mode = 'round') {
    const numValue = toNum(value);
    const numTotal = toNum(total);

    // 유효성 검증 - NaN 체크
    if (isNaN(numValue) || isNaN(numTotal)) {
        return NaN;
    }

    // 유효성 검증 - Infinity 체크
    if (!isFinite(numValue) || !isFinite(numTotal)) {
        // 분자가 Infinity이고 분모가 유한한 경우 → Infinity 반환
        if (!isFinite(numValue) && isFinite(numTotal)) {
            return Infinity;
        }
        // 그 외의 경우 (분모가 Infinity이거나 둘 다 Infinity) → NaN 반환
        return NaN;
    }

    // 유효성 검증 - 0으로 나누기 방지
    if (numTotal === 0) {
        if (numValue === 0) {
            return NaN; // 0 / 0
        }
        return Infinity; // value / 0
    }

    // 퍼센트 계산
    const percentValue = (numValue / numTotal) * 100;

    // 계산 결과가 유효한지 확인
    if (!isFinite(percentValue)) {
        return Infinity;
    }

    // 반올림 모드에 따라 처리
    let result;
    const multiplier = Math.pow(10, decimals);

    switch (mode) {
        case 'floor': // 내림
            result = Math.floor(percentValue * multiplier) / multiplier;
            break;
        case 'ceil': // 올림
            result = Math.ceil(percentValue * multiplier) / multiplier;
            break;
        case 'round': // 반올림 (기본값)
        default:
            result = Math.round(percentValue * multiplier) / multiplier;
            break;
    }

    return Number(result.toFixed(decimals));
}

export default percent;
