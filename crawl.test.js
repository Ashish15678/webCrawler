const { normalizeUrl, getUrlFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl", () => {
  const input = "https://www.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "www.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl", () => {
  const input = "https://www.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "www.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl", () => {
  const input = "http://www.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "www.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml", () => {
  const inputHtmlBody = `
  <html>
        <body>
            <a href= "https://blog.boot.dev/">Boot </a>
        </body>
  </html>`;
  const inputBaseUrl = "https://blog.boot.dev/";
  const actual = getUrlFromHTML(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/", "https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});
