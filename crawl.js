function getUrlFromHTML(htmlBody, baseUrl) {
  const urls = {};
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
