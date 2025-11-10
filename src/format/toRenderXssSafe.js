/**
 * 서버로부터 받은 텍스트를 렌더링할 때 XSS 공격을 방지하기 위해 HTML 특수 문자를 이스케이프하는 함수
 * @param {*} value - 이스케이프할 값
 * @returns {string} 이스케이프된 안전한 문자열
 */
export function toRenderXssSafe(value) {
    // null이나 undefined인 경우 빈 문자열 반환
    if (value === null || value === undefined) {
        return '';
    }

    // 문자열로 변환
    const str = String(value);

    // HTML 특수 문자를 이스케이프
    // 주의: &를 먼저 처리해야 나중에 &lt; 같은 것이 &amp;lt;로 변환되지 않음
    return str
        .replace(/&/g, '&amp;') // &를 &amp;로 (먼저 처리)
        .replace(/</g, '&lt;') // <를 &lt;로
        .replace(/>/g, '&gt;') // >를 &gt;로
        .replace(/"/g, '&quot;') // "를 &quot;로
        .replace(/'/g, '&#x27;'); // '를 &#x27;로
}

export default toRenderXssSafe;
