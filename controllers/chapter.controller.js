import db from "../models/index.js";

const Chapter = db.Chapter;
const Comic = db.Comic;

export function countChapter(req, res) {
  Chapter.countDocuments({}, (err, result) => {
    console.log(result);
    res.status(404).json({ result });
  });
}

export function getChapterbyId(req, res) {
  const chapterId = req.params.id;

  Chapter.findOne({ _id: chapterId })
    .populate("comicId", "-__v")

    .exec((err, chapter) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
        return;
      }
      if (chapter) {
        res.status(200).json({
          success: true,
          message: "Success!",
          chapter: chapter,
        });
        return;
      }
      res.status(400).json({
        success: false,
        message: "Not found comicId!",
      });
      return;
    });
}

export async function createChapter(req, res) {
  const comicId = req.params.id;

  const chapter = Chapter({
    comicId: req.params.id || null,
    chapterNumber: req.body.chapterNumber || -1,
    chapterName: req.body.chapterName || "",
    chapterImgs: req.body.chapterImgs || [],
    views: req.body.views || 0,
  });

  if (req.params.id) {
    Comic.findOne({ _id: comicId })
      .populate("chapters", "-__v")
      .exec(async (err, comic) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
          return;
        }
        console.log(comic);
        if (comic) {
          const result = await Chapter.findOne({
            name: chapter.chapterName,
            comicId: chapter.comicId,
          });
          if (result) {
            chapter.save((err, chapter) => {
              // comic.chapters.push(chapter._id);
              // comic.save();
              res.status(200).json({
                success: true,
                message: "Success!",
                chapter: chapter,
              });
            });
          } else {
            console.log("Chapter is exists!");
            console.log(chapter);
            res.status(400).json({
              success: false,
              message: "Chapter is exists!",
              chapter: chapter,
            });
          }
          return;
        } else {
          res.status(400).json({
            success: false,
            message: "Not found comicId!",
          });
          return;
        }
      });
  } else {
    res.status(400).json({
      success: false,
      message: "Require comicId",
    });
  }
}

export function updateChapter(req, res) {
  const chapterId = req.params.id;
  const change = req.body;

  Chapter.updateOne({ _id: chapterId }, change, (err, chapter) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
      return;
    }
    if (chapter) {
      res.status(200).json({
        success: true,
        message: "Success!",
        chapter: chapter,
      });
      return;
    }
    res.status(400).json({
      success: false,
      message: "Not found comicId!",
    });
    return;
  });
}

export function deleteChapter(req, res) {
  const chapterId = req.params.id;

  Chapter.deleteOne({ _id: chapterId }).exec((err, chapter) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
      return;
    }
    if (chapter) {
      // Comic.updateOne(
      // { _id: chapter.comicId },
      // { $pull: { chapters: [chapter.comicId] } }
      // );
      res.status(200).json({
        success: true,
        message: "Success!",
        chapter: chapter,
      });
      return;
    }
    res.status(400).json({
      success: false,
      message: "Not found chapterId!",
    });
    return;
  });
}
