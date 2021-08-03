import Chapter from "../models/chapter.js";
import Commic from "../models/commic.js";

export const createChapter = (req, res) => {
  const chapter = new Chapter({
    chapter_number: req.body.chapter_number,
    chapter_name: req.body.chapter_name,
    chapter_imgs: req.body.chapter_imgs,
    views: 0,
  });

  Commic.findById(req.params.commic_id, (err, commic) => {
    if (err) {
      res.status(404).json({
        message: err,
      });
    } else {
      chapter
        .save()
        .then((newChapter) => {
          Commic.updateOne(
            { _id: commic._id },
            { $push: { chapters: newChapter._id } }
          )
            .exec()
            .then(() => {
              res.status(200).json({
                success: true,
                chapter: newChapter,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    }
  });
};

export const getChapterList = (req, res) => {
  const commic_id = req.params?.commic_id;
  console.log(commic_id);

  Commic.findById(commic_id, (err, commic) => {
    if (commic) {
      (async () => {
        const promises = commic.chapters.map(async (chapter_id) => {
          const chapter = await Chapter.findById(chapter_id).select(
            "_id chapter_name views createdAt updatedAt"
          );
          console.log(chapter);
          return chapter;
        });
        const chapterList = await Promise.all(promises);
        console.log("end");
        return res.status(200).json({
          status: true,
          message: "ChapterList",
          chapters: chapterList,
        });
      })();
    } else {
      res.status(500).json({
        status: false,
        message: "not found",
      });
    }
  });
};

export const getSingleChapter = (req, res) => {
  const commic_id = req.params.commic_id;
  const chapter_number = req.params.chapter_number;

  Commic.findById(commic_id, (err, commic) => {
    if (err) {
      return res.status(500).json({ message: err, success: false });
    }

    const len = commic.chapters.length;
    if (chapter_number <= len && chapter_number >= 1) {
      console.log(commic.chapters[0]);
      Chapter.findById(commic.chapters[chapter_number - 1], (err, chapter) => {
        if (err) {
          return res.status(500).json({ message: err, success: false });
        }

        return res.status(200).json({
          success: true,
          chapter: chapter,
        });
      });
    } else {
      return res.status(404).json({ message: "not found" });
    }
  });
};
