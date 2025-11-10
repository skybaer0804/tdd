/**
 * 값이 유효한 URL 형식인지 확인하는 함수
 * @param {*} value - 확인할 값
 * @returns {boolean} 유효한 URL이면 true, 아니면 false
 */
export function isUrl(value) {
    // null이나 undefined인 경우
    if (value === null || value === undefined) {
        return false;
    }

    // 문자열이 아닌 경우
    if (typeof value !== 'string') {
        return false;
    }

    // 빈 문자열이나 공백만 있는 경우
    const trimmed = value.trim();
    if (trimmed === '') {
        return false;
    }

    // mailto 프로토콜은 특별 처리 (:// 없음)
    if (trimmed.startsWith('mailto:')) {
        const mailtoPattern = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return mailtoPattern.test(trimmed);
    }

    // file 프로토콜은 특별 처리 (file:/// 형식)
    if (trimmed.startsWith('file://')) {
        const filePattern = /^file:\/\/\/?[-a-zA-Z0-9()@:%_\+.~#?&=\/]*$/;
        return filePattern.test(trimmed);
    }

    // 일반 URL 정규표현식 패턴
    // 프로토콜://도메인(포트)/경로?쿼리#해시
    // 프로토콜: http, https, ftp, ws, wss 등
    // 도메인: example.com, www.example.com, IP 주소 등
    const urlPattern =
        /^(https?|ftp|ws|wss):\/\/([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b|localhost|([0-9]{1,3}\.){3}[0-9]{1,3})(:[0-9]{1,5})?(\/[-a-zA-Z0-9()@:%_\+.~#?&=\/]*)?(\?[-a-zA-Z0-9()@:%_\+.~#?&=\/]*)?(\#[-a-zA-Z0-9()@:%_\+.~#?&=\/]*)?$/;

    return urlPattern.test(trimmed);
}

export default isUrl;
