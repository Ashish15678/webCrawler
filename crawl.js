const { JSDOM } = require("jsdom");

function getUrlFromHTML(htmlBody, baseUrl) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative
      urls.push(`${baseUrl}${linkElement.href}`);
    } else {
      //absolute
      urls.push(linkElement.href);
    }
  }
  return urls;
}

function normalizeUrl(urlString) {
  const urlobject = new URL(urlString);

  const hostPath = `${urlobject.hostname}${urlobject.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/")
    return hostPath.slice(0, -1);
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getUrlFromHTML,
};
