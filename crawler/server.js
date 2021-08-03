const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
const { get } = require("http");

getData("https://timtruyen.net/truyen-tranh/cam-nang-tan-cong-tra-nam");

async function getData(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let data = [];
      $(".overview-story").each((index, el) => {
        const img = $(el).children().children().attr("src");
        const title = $(el).children().find("h1").text();
        const description = $(el).children().find("p");
        console.log("fetch chap link");
      });
      $(".chapter-item").each((index, el) => {
        const aEl = $(el).children().first().children().first();
        const name = aEl.text();
        const link = aEl.attr("href");
        console.log(link);
        const img_link = [];
        const links = getChapImgLink(link)
          .then((dat) => {
            img_link.push(dat);
          })
          .then(() => {
            data.push({ name: name, link: link, img_link: img_link });
            // console.log(data);
          });
      });
      getChapList($).map((link) => console.log(link));
      // .end().length;
      // .then((data) => {
      // console.log("wiite..............................................");
      // fs.writeFileSync("data.json", JSON.stringify(data));
      // });
      // .after(() => {
      //   console.log("wiite..............................................");
      //   fs.writeFileSync("data.json", JSON.stringify(data));
      // });
    } else {
      console.log(error);
    }
  });
}

const getProductElements = ($) => {
  let retEl = [];
  $(".chapter-item")
    .find(" > div > div ")
    .each((_, ele) => {
      const link = ele.attr("href");
      console.log(link);
      retEl.push($(ele));
    });
  return retEl;
};

const getChapList = ($) => {
  let retEl = [];
  $(".chapter-item")
    .find(" > div > a ")
    .each((_, ele) => {
      // console.log(ele.text());
      retEl.push($(ele));
    });
  return retEl;
};

// getChapImgLink(
//   "https://timtruyen.net/truyen-tranh/vo-luyen-dinh-phong/chapter-6"
// ).then((data) => console.log(data));

async function getChapImgLink(url) {
  let promise;
  await request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let data = [];
      $(".lazy").each((index, el) => {
        const job = $(el).attr("data-src");
        data.push(job);
      });
      promise = new Promise((res, rej) => {
        res(data);
      });
    } else {
      console.log(error);
      promise = new Promise((res, rej) => {
        res([]);
      });
    }
  });
  return promise;
}

// getChapInfo("https://timtruyen.net/truyen-tranh/cam-nang-tan-cong-tra-nam");

async function getChapInfo(url) {
  let promise;
  await request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let data = [];
      $(".overview-story").each((index, el) => {
        const img = $(el).children().children().attr("src");
        const title = $(el).children().find("h1").text();
        const description = $(el).children().find("p");
        console.log("a");
      });
      promise = new Promise((res, rej) => {
        res(data);
      });
    } else {
      console.log(error);
      promise = new Promise((res, rej) => {
        res([]);
      });
    }
  });
  return promise;
}

// function getChapImgLink(url) {
//   request(url, (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);
//       let data = [];
//       $(".lazy").each((index, el) => {
//         const job = $(el).attr("data-src");
//         data.push({
//           job,
//         });
//       });

//       fs.writeFileSync("data.json", JSON.stringify(data));
//     } else {
//       console.log(error);
//     }
//   });
// }
