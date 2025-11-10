import { isUrl } from '../src/validate/isUrl.js';

describe('isUrl 함수 테스트', () => {
    test('유효한 HTTP URL을 true로 반환한다', () => {
        expect(isUrl('http://example.com')).toBe(true);
        expect(isUrl('http://www.example.com')).toBe(true);
        expect(isUrl('http://example.com/path')).toBe(true);
    });

    test('유효한 HTTPS URL을 true로 반환한다', () => {
        expect(isUrl('https://example.com')).toBe(true);
        expect(isUrl('https://www.example.com')).toBe(true);
        expect(isUrl('https://example.com/path')).toBe(true);
    });

    test('포트 번호가 포함된 URL을 true로 반환한다', () => {
        expect(isUrl('http://example.com:8080')).toBe(true);
        expect(isUrl('https://example.com:3000')).toBe(true);
        expect(isUrl('http://localhost:3000')).toBe(true);
    });

    test('쿼리 파라미터가 포함된 URL을 true로 반환한다', () => {
        expect(isUrl('https://example.com?key=value')).toBe(true);
        expect(isUrl('https://example.com?key1=value1&key2=value2')).toBe(true);
        expect(isUrl('https://example.com/path?key=value')).toBe(true);
    });

    test('해시가 포함된 URL을 true로 반환한다', () => {
        expect(isUrl('https://example.com#section')).toBe(true);
        expect(isUrl('https://example.com/path#section')).toBe(true);
        expect(isUrl('https://example.com?key=value#section')).toBe(true);
    });

    test('IP 주소 형식의 URL을 true로 반환한다', () => {
        expect(isUrl('http://192.168.1.1')).toBe(true);
        expect(isUrl('https://127.0.0.1:3000')).toBe(true);
        expect(isUrl('http://8.8.8.8')).toBe(true);
    });

    test('서브도메인이 포함된 URL을 true로 반환한다', () => {
        expect(isUrl('https://subdomain.example.com')).toBe(true);
        expect(isUrl('http://api.example.com')).toBe(true);
        expect(isUrl('https://www.subdomain.example.com')).toBe(true);
    });

    test('유효하지 않은 URL을 false로 반환한다', () => {
        expect(isUrl('not-a-url')).toBe(false);
        expect(isUrl('example.com')).toBe(false);
        expect(isUrl('www.example.com')).toBe(false);
        expect(isUrl('just some text')).toBe(false);
    });

    test('프로토콜만 있는 경우 false를 반환한다', () => {
        expect(isUrl('http://')).toBe(false);
        expect(isUrl('https://')).toBe(false);
    });

    test('빈 문자열은 false를 반환한다', () => {
        expect(isUrl('')).toBe(false);
        expect(isUrl('   ')).toBe(false);
    });

    test('null이나 undefined는 false를 반환한다', () => {
        expect(isUrl(null)).toBe(false);
        expect(isUrl(undefined)).toBe(false);
    });

    test('숫자나 객체는 false를 반환한다', () => {
        expect(isUrl(123)).toBe(false);
        expect(isUrl({})).toBe(false);
        expect(isUrl([])).toBe(false);
    });

    test('다른 프로토콜도 유효한 URL로 인식한다', () => {
        expect(isUrl('ftp://example.com')).toBe(true);
        expect(isUrl('mailto:test@example.com')).toBe(true);
        expect(isUrl('file:///path/to/file')).toBe(true);
    });
});
