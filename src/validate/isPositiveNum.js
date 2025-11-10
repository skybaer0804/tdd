/**
 * 값이 0을 허용하는 양의 정수인지 확인하는 함수
 * @param {*} value - 확인할 값
 * @returns {boolean} 0을 허용하는 양의 정수면 true, 아니면 false
 */
export function isPositiveNum(value) {
    return typeof value === 'number' && Number.isInteger(value) && value >= 0 && !isNaN(value);
}

export default isPositiveNum;
