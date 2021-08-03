const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
const { get } = require("http");

// getData("https://timtruyen.net/truyen-tranh/cam-nang-tan-cong-tra-nam");
getData("https://timtruyen.net/truyen-tranh/sieu-nang-lap-phuong");
// getData("https://timtruyen.net/truyen-tranh/kieu-phu-co-hi");
// getData("https://timtruyen.net/truyen-tranh/kieu-phu-co-hi");
// getData("https://timtruyen.net/truyen-tranh/kieu-phu-co-hi");
// getData("https://timtruyen.net/truyen-tranh/kieu-phu-co-hi");
// getData("https://timtruyen.net/truyen-tranh/kieu-phu-co-hi");
// getData("https://timtruyen.net/truyen-tranh/kieu-phu-co-hi");
// getData("https://timtruyen.net/truyen-tranh/kieu-phu-co-hi");
// getData("https://timtruyen.net/truyen-tranh/kieu-phu-co-hi");
// getData("https://timtruyen.net/truyen-tranh/kieu-phu-co-hi");

async function getData(url) {
  let data = [];
  let links = {};
  await request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      (async function () {
        await getChapList($).map((link) => {
          // console.log(link.attr("href") + link.text());
          const name = link.text();
          const chapLink = link.attr("href");
          links[name] = chapLink;
          // console.log(links);
        });
        // return new Promise();
      })();
      console.log("links");
      console.log(links);

      //   for (const key in links) {
      //     if (Object.hasOwnProperty.call(links, key)) {
      //       const url = links[key];
      //       request(url, (error, response, html) => {
      //         if (!error && response.statusCode == 200) {
      //           const $ = cheerio.load(html);
      //           getChapImage($).map((link) => {
      //             // console.log(link);
      //             console.log("getting image");
      //           });
      //         } else {
      //           console.log(error);
      //         }
      //       });
      //     }
      //     console.log("end");
      //   }
      console.log("end3");
    } else {
      console.log(error);
    }
  });

  await loopChapter(links, data);
}

const loopChapter = async (links, data) => {
  for (const key in links) {
    console.log("start");
    const flag = false;
    async function handleLoop(flag, count = 0) {
      if (!flag) flag = true;
      else return;
      setTimeout(() => {
        try {
          throw new Error("Timeout");
        } catch (err) {
          if (count < 5 && flag === true) {
            console.log("Timeout -> restart " + count);
            flag = false;
            handleLoop(flag, count + 1);
            return;
          } else {
            return;
          }
        }
      }, 10000);
      if (Object.hasOwnProperty.call(links, key)) {
        const url = links[key];
        await request(url, (error, response, html) => {
          (async () => {
            if (!error && response.statusCode == 200) {
              const $ = await cheerio.load(html);
              const img_link = await getChapImage($);
              // .map((link) => {
              // console.log(link);
              //   console.log("getting image");
              console.log(key);
              data.push(img_link);
              // });
            } else {
              console.log(error);
            }
          })();
        });
        flag = false;
      }
    }

    await handleLoop(flag);
    console.log("end");
  }
  console.log("end2");
  console.log(data);
};

const getChapList = ($) => {
  let retEl = [];
  $(".chapter-item")
    .find("> div > a")
    .each((_, ele) => {
      //   const link = ele.attr("href");
      //   retEl.push(link);
      retEl.push($(ele));
    });
  return retEl;
};

const getChapImage = async ($) => {
  let retEl = [];
  await $(".lazy").each((_, ele) => {
    const link = $(ele).attr("data-src");
    // console.log(_);
    retEl.push(link);
  });
  return retEl;
  //   return new Promise((ful, rej) => {
  //     ful(retEl);
  //   });
};
