import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractText, extractTitle } from '../scripts/build-search-index.js';

test('extractTitle reads the document title', () => {
  assert.equal(extractTitle('<title>Access Cards - CERN</title>'), 'Access Cards - CERN');
  assert.equal(extractTitle('<title >  Spaced  </title>'), 'Spaced');
});

test('extractTitle returns empty string when no title', () => {
  assert.equal(extractTitle('<p>no title here</p>'), '');
});

test('extractText strips tags and collapses whitespace', () => {
  const html = '<h1>Hello</h1>\n\n<p>World   of\ttext</p>';
  assert.equal(extractText(html), 'Hello World of text');
});

test('extractText removes script and style contents', () => {
  const html =
    '<style>.a{color:red}</style><p>Visible</p><script>var x = 1; alert(x);</script>';
  const out = extractText(html);
  assert.equal(out, 'Visible');
  assert.ok(!out.includes('color'));
  assert.ok(!out.includes('alert'));
});

test('extractText handles empty input', () => {
  assert.equal(extractText(''), '');
});
