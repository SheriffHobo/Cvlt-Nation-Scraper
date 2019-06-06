var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
  return axios.get("https://www.cvltnation.com").then(function(res) {
    var $ = cheerio.load(res.data);
    console.log("scraping");
    var articles = [];

    $(".vw-post-box").each(function(i, element) {
      var head = $(element)
        .find("h3.vw-post-box-title a")
        .text()
        .trim();

      var url = $(this)
        .find(".vw-post-box-footer a")
        .attr("href");

      var sum = $(this)
        .find(".vw-post-box-excerpt p")
        .text()
        .trim();

      if (head && sum && url) {
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    // console.log(articles);
    return articles;
  });
};

module.exports = scrape;
