/**
 * 값이 숫자인지 확인하는 함수
 * @param {*} value - 확인할 값
 * @returns {boolean} 숫자면 true, 아니면 false
 */
export function isNum(value) {
    return typeof value === 'number' && !isNaN(value);
}

export default isNum;
