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

test("getUrlsFromHtml absolute", () => {
  const inputHtmlBody = `
  <html>
        <body>
            <a href= "https://blog.boot.dev/">Boot </a>
        </body>
  </html>`;
  const inputBaseUrl = "https://blog.boot.dev/";
  const actual = getUrlFromHTML(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml relative", () => {
  const inputHtmlBody = `
  <html>
        <body>
            <a href= "/path/">Boot </a>
        </body>
  </html>`;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlFromHTML(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml relative and absolute", () => {
  const inputHtmlBody = `
  <html>
        <body>
            <a href= "https://blog.boot.dev/path1/">Boot path one </a>
            <a href= "/path2/">Boot path two</a>
        </body>
  </html>`;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlFromHTML(inputHtmlBody, inputBaseUrl);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});
