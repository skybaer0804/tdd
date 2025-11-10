import { isInputXssSafe } from '../src/validate/isInputXssSafe.js';

describe('isInputXssSafe 함수 테스트', () => {
    test('안전한 일반 텍스트는 true를 반환한다', () => {
        expect(isInputXssSafe('안전한 텍스트')).toBe(true);
        expect(isInputXssSafe('Hello World')).toBe(true);
        expect(isInputXssSafe('123456')).toBe(true);
        expect(isInputXssSafe('test@example.com')).toBe(true);
    });

    test('script 태그가 포함된 입력은 false를 반환한다', () => {
        expect(isInputXssSafe('<script>alert("XSS")</script>')).toBe(false);
        expect(isInputXssSafe('<script type="text/javascript">alert(1)</script>')).toBe(false);
        expect(isInputXssSafe('Hello<script>alert("XSS")</script>World')).toBe(false);
    });

    test('javascript: 프로토콜이 포함된 입력은 false를 반환한다', () => {
        expect(isInputXssSafe('javascript:alert("XSS")')).toBe(false);
        expect(isInputXssSafe('<a href="javascript:alert(1)">Click</a>')).toBe(false);
        expect(isInputXssSafe('javascript:void(0)')).toBe(false);
    });

    test('이벤트 핸들러가 포함된 입력은 false를 반환한다', () => {
        expect(isInputXssSafe('<img onclick="alert(1)">')).toBe(false);
        expect(isInputXssSafe('<div onerror="alert(1)">')).toBe(false);
        expect(isInputXssSafe('<body onload="alert(1)">')).toBe(false);
        expect(isInputXssSafe('<input onfocus="alert(1)">')).toBe(false);
        expect(isInputXssSafe('<svg onload="alert(1)">')).toBe(false);
    });

    test('iframe, object, embed 태그가 포함된 입력은 false를 반환한다', () => {
        expect(isInputXssSafe('<iframe src="evil.com"></iframe>')).toBe(false);
        expect(isInputXssSafe('<object data="evil.swf"></object>')).toBe(false);
        expect(isInputXssSafe('<embed src="evil.swf">')).toBe(false);
    });

    test('img 태그의 onerror 속성이 포함된 입력은 false를 반환한다', () => {
        expect(isInputXssSafe('<img src="x" onerror="alert(1)">')).toBe(false);
        expect(isInputXssSafe('<img onerror="alert(1)">')).toBe(false);
    });

    test('HTML 엔티티 인코딩된 스크립트는 false를 반환한다', () => {
        expect(isInputXssSafe('&lt;script&gt;alert(1)&lt;/script&gt;')).toBe(false);
        expect(isInputXssSafe('&#60;script&#62;alert(1)&#60;/script&#62;')).toBe(false);
    });

    test('data URI가 포함된 입력은 false를 반환한다', () => {
        expect(isInputXssSafe('data:text/html,<script>alert(1)</script>')).toBe(false);
        expect(isInputXssSafe('data:image/svg+xml,<svg onload="alert(1)">')).toBe(false);
    });

    test('vbscript 프로토콜이 포함된 입력은 false를 반환한다', () => {
        expect(isInputXssSafe('vbscript:alert("XSS")')).toBe(false);
        expect(isInputXssSafe('<a href="vbscript:alert(1)">Click</a>')).toBe(false);
    });

    test('빈 문자열이나 공백만 있는 경우 true를 반환한다', () => {
        expect(isInputXssSafe('')).toBe(true);
        expect(isInputXssSafe('   ')).toBe(true);
    });

    test('null이나 undefined는 false를 반환한다', () => {
        expect(isInputXssSafe(null)).toBe(false);
        expect(isInputXssSafe(undefined)).toBe(false);
    });

    test('숫자나 객체는 false를 반환한다', () => {
        expect(isInputXssSafe(123)).toBe(false);
        expect(isInputXssSafe({})).toBe(false);
        expect(isInputXssSafe([])).toBe(false);
    });

    test('안전한 HTML 태그는 허용한다', () => {
        expect(isInputXssSafe('<p>안전한 텍스트</p>')).toBe(true);
        expect(isInputXssSafe('<div>내용</div>')).toBe(true);
        expect(isInputXssSafe('<span>텍스트</span>')).toBe(true);
        expect(isInputXssSafe('<strong>굵게</strong>')).toBe(true);
    });

    test('대소문자 구분 없이 위험한 패턴을 감지한다', () => {
        expect(isInputXssSafe('<SCRIPT>alert(1)</SCRIPT>')).toBe(false);
        expect(isInputXssSafe('<Script>alert(1)</Script>')).toBe(false);
        expect(isInputXssSafe('JAVASCRIPT:alert(1)')).toBe(false);
        expect(isInputXssSafe('JavaScript:alert(1)')).toBe(false);
    });
});
