const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
const { get } = require("http");
const { clear } = require("console");

let commicInfo = {
  name: "",
  commic_img: "",
  status: "",
  author: "",
  lastChapter: "", //use?
  genres: [],
  view: "",
  subcribe: "",
  like: "",
  description: "",
  chapters: [],
};

let chapterLinkL = [];
let chapterList = [];

(getChapterLink = async (url) => {
  await request(url, async (err, res, html) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(html);

      //getCommicInfo
      $(".text > h1").each((_, ele) => {
        commicInfo.name = $(ele).text();
      });
      commicInfo.commic_img = $(".overview-story > div > img")
        .first()
        .attr("src");
      commicInfo.status = $(".txt >p:nth-child(1)").first().text();
      commicInfo.lastChapter = $(".txt > p:nth-child(2)").first().text();
      commicInfo.author = $(".txt > p:nth-child(3)").first().text();
      commicInfo.subcribe = $(".sp01 > span").first().text();
      commicInfo.view = $(".sp01:nth-child(4)").first().text();
      commicInfo.like = $(".sp01:nth-child(3)").first().text();
      $(".list-tag-story")
        .find("> li > a")
        .each((_, ele) => {
          commicInfo.genres.push($(ele).text());
        });
      // console.log(commicInfo);

      //getChapList
      // let chapterNameL = [];
      $(".chapter-item")
        .find("> div > a")
        .each((_, ele) => {
          const name = $(ele).text();
          // chapterNameL.push(name);
          const chapLink = $(ele).attr("href");
          chapterLinkL.push(chapLink);
          // console.log(name + " " + chapLink);
          chapterList.push({
            chapter_number: "",
            chapter_name: name,
            created_at: "",
            views: "",
            chapter_imgs: [],
          });
        });

      $(".chapter-item")
        .find(" > div:nth-child(2)")
        .each((_, ele) => {
          // console.log($(ele).text());
          // timeList.push($(ele).text());
          chapterList[_].created_at = $(ele).text();
        });
      // console.log(chapterList);
    }
  });

  console.log("e");

  //each Chapter
  await (async () => {
    await Promise.all(
      chapterLinkL.map(async (link, id) => {
        await request(link, async (err, res, html) => {
          if (!err && res.statusCode == 200) {
            const $ = cheerio.load(html);

            await $(".gallery")
              .find("> img ")
              .each((_, ele) => {
                // console.log($(ele).attr("data-src"));
                chapterList[id].chapter_imgs.push($(ele).attr("data-src"));
                // console.log("c");
              });
            // console.log("d");
            // console.log(chapterList[id]);
          }
        });
      })
    );
    // console.log("a");
    // console.log(chapterList);
  })();

  // console.log("b");
  commicInfo.chapters = chapterList;
  console.log(commicInfo);

  fs.writeFileSync("./data.json", JSON.stringify(commicInfo));
})("https://timtruyen.net/truyen-tranh/vo-toi-nguoi-khong-cam-xuc");

// ("https://timtruyen.net/truyen-tranh/sieu-nang-lap-phuong");
