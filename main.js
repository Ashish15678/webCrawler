const { crawlPage } = require("./crawl");
function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many inputs");
    process.exit(1);
  }
  const baseUrl = process.argv[2];
  console.log(baseUrl);
  crawlPage(baseUrl);
}

main();
