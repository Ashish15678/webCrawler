const { JSDOM } = require("jsdom");

async function crawlPage(currentUrl) {
  console.log(`Currently crawling ${currentUrl}`);

  try {
    const resp = await fetch(currentUrl);

    if (resp.status > 399) {
      console.log(
        `error in fetch with status code ${resp.status} at page: ${currentUrl}`
      );
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non HTML response , content-type: ${contentType} on page: ${currentUrl}`
      );
      return;
    }

    console.log(await resp.text());
  } catch (error) {
    console.log(`Error found while crawling: ${currentUrl}`);
  }
}

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
  crawlPage,
};
