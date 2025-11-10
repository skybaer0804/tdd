/**
 * 입력값이 XSS 공격에 안전한지 확인하는 함수
 * @param {*} value - 확인할 값
 * @returns {boolean} 안전하면 true, 위험하면 false
 */
export function isInputXssSafe(value) {
    // null이나 undefined인 경우
    if (value === null || value === undefined) {
        return false;
    }

    // 문자열이 아닌 경우
    if (typeof value !== 'string') {
        return false;
    }

    const input = value.trim();

    // 빈 문자열이나 공백만 있는 경우는 안전
    if (input === '') {
        return true;
    }

    // 위험한 패턴들을 검사 (대소문자 구분 없이)
    const lowerInput = input.toLowerCase();

    // 1. script 태그 검사
    if (/<script[\s>]/.test(lowerInput) || /<\/script>/i.test(input)) {
        return false;
    }

    // 2. javascript: 프로토콜 검사
    if (/javascript\s*:/i.test(input)) {
        return false;
    }

    // 3. 이벤트 핸들러 검사 (on으로 시작하는 속성)
    if (/on\w+\s*=/i.test(input)) {
        return false;
    }

    // 4. iframe, object, embed 태그 검사
    if (/<(iframe|object|embed)[\s>]/i.test(input)) {
        return false;
    }

    // 5. HTML 엔티티 인코딩된 스크립트 검사
    if (/&lt;script|&#60;script|&#x3c;script/i.test(input)) {
        return false;
    }

    // 6. data URI 검사 (특히 text/html, image/svg+xml)
    if (/data\s*:\s*(text\/html|image\/svg\+xml)/i.test(input)) {
        return false;
    }

    // 7. vbscript 프로토콜 검사
    if (/vbscript\s*:/i.test(input)) {
        return false;
    }

    // 모든 검사를 통과하면 안전
    return true;
}

export default isInputXssSafe;
