var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function(req, res) {
    scrape().then(res=> 
      res.forEach(article => db.Headline.create(article))
      ).then(() => {
        res.redirect("/")
      })
    return scrape()
      .then(function(articles) {
        db.Headline.save(articles).then(res => {
          console.log(res);
        });
      })
      .then(function(dbHeadline) {
        console.log('fetch ' + dbHeadline);
        if (dbHeadline.length === 0) {
          res.json({
            message: "No new articles today. Check back tomorrow!"
          });
        }
        else {
          res.json({
            message: "Added " + dbHeadline.length + " new articles!"
          });
        }
      })
      .catch(function(err) {
        res.json({
          message: "Scrape complete!!"
        });
      });
  }
};
