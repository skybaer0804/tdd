import { toRenderXssSafe } from '../src/format/toRenderXssSafe.js';

describe('toRenderXssSafe 함수 테스트', () => {
    test('일반 텍스트는 그대로 반환한다', () => {
        expect(toRenderXssSafe('안전한 텍스트')).toBe('안전한 텍스트');
        expect(toRenderXssSafe('Hello World')).toBe('Hello World');
        expect(toRenderXssSafe('123456')).toBe('123456');
    });

    test('HTML 특수 문자를 이스케이프한다', () => {
        expect(toRenderXssSafe('<script>alert("XSS")</script>')).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
        expect(toRenderXssSafe('<div>내용</div>')).toBe('&lt;div&gt;내용&lt;/div&gt;');
        expect(toRenderXssSafe('&amp;')).toBe('&amp;amp;');
    });

    test('작은따옴표와 큰따옴표를 이스케이프한다', () => {
        expect(toRenderXssSafe("It's a test")).toBe('It&#x27;s a test');
        expect(toRenderXssSafe('He said "Hello"')).toBe('He said &quot;Hello&quot;');
        expect(toRenderXssSafe(`It's "great"`)).toBe('It&#x27;s &quot;great&quot;');
    });

    test('javascript: 프로토콜을 이스케이프한다', () => {
        expect(toRenderXssSafe('javascript:alert(1)')).toBe('javascript:alert(1)');
        expect(toRenderXssSafe('<a href="javascript:alert(1)">Click</a>')).toBe('&lt;a href=&quot;javascript:alert(1)&quot;&gt;Click&lt;/a&gt;');
    });

    test('이벤트 핸들러가 포함된 HTML을 이스케이프한다', () => {
        expect(toRenderXssSafe('<img onclick="alert(1)">')).toBe('&lt;img onclick=&quot;alert(1)&quot;&gt;');
        expect(toRenderXssSafe('<div onerror="alert(1)">')).toBe('&lt;div onerror=&quot;alert(1)&quot;&gt;');
        expect(toRenderXssSafe('<body onload="alert(1)">')).toBe('&lt;body onload=&quot;alert(1)&quot;&gt;');
    });

    test('iframe, object, embed 태그를 이스케이프한다', () => {
        expect(toRenderXssSafe('<iframe src="evil.com"></iframe>')).toBe('&lt;iframe src=&quot;evil.com&quot;&gt;&lt;/iframe&gt;');
        expect(toRenderXssSafe('<object data="evil.swf"></object>')).toBe('&lt;object data=&quot;evil.swf&quot;&gt;&lt;/object&gt;');
        expect(toRenderXssSafe('<embed src="evil.swf">')).toBe('&lt;embed src=&quot;evil.swf&quot;&gt;');
    });

    test('data URI를 이스케이프한다', () => {
        expect(toRenderXssSafe('data:text/html,<script>alert(1)</script>')).toBe('data:text/html,&lt;script&gt;alert(1)&lt;/script&gt;');
        expect(toRenderXssSafe('data:image/svg+xml,<svg onload="alert(1)">')).toBe('data:image/svg+xml,&lt;svg onload=&quot;alert(1)&quot;&gt;');
    });

    test('빈 문자열이나 공백만 있는 경우 그대로 반환한다', () => {
        expect(toRenderXssSafe('')).toBe('');
        expect(toRenderXssSafe('   ')).toBe('   ');
    });

    test('null이나 undefined는 빈 문자열로 반환한다', () => {
        expect(toRenderXssSafe(null)).toBe('');
        expect(toRenderXssSafe(undefined)).toBe('');
    });

    test('숫자는 문자열로 변환하여 반환한다', () => {
        expect(toRenderXssSafe(123)).toBe('123');
        expect(toRenderXssSafe(0)).toBe('0');
        expect(toRenderXssSafe(-123)).toBe('-123');
    });

    test('이미 이스케이프된 문자는 다시 이스케이프한다', () => {
        expect(toRenderXssSafe('&lt;script&gt;')).toBe('&amp;lt;script&amp;gt;');
        expect(toRenderXssSafe('&quot;test&quot;')).toBe('&amp;quot;test&amp;quot;');
    });

    test('여러 줄 텍스트도 처리한다', () => {
        const multiLine = '<div>Line 1</div>\n<div>Line 2</div>';
        expect(toRenderXssSafe(multiLine)).toBe('&lt;div&gt;Line 1&lt;/div&gt;\n&lt;div&gt;Line 2&lt;/div&gt;');
    });

    test('복합적인 XSS 공격 시도를 이스케이프한다', () => {
        const xssAttempt = '<img src="x" onerror="alert(\'XSS\')">';
        expect(toRenderXssSafe(xssAttempt)).toBe('&lt;img src=&quot;x&quot; onerror=&quot;alert(&#x27;XSS&#x27;)&quot;&gt;');
    });
});
