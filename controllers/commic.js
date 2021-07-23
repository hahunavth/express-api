import mongoose from "mongoose";
import Commic from "../models/commic.js";

// _id: mongoose.Schema.Types.ObjectId,
// name: {
//   type: String,
//   required: true,
// },
// another_name: String,
// status: String,
// genres: String,
// views: Number,
// rate: Number,
// subcribe: Number,
// description: String,
// created_at: Date,
// chapters: [
//   {
//     chapter_name: String,
//     chapter_imgs: [String],
//     views: Number,
//     created_at: Date,
//   },
// ],
// });

export function createCommic(req, res) {
  const commic = new Commic({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    another_name: req.body.another_name,
    status: req.body.status,
    genres: req.body.genres,
    views: req.body.views,
    rate: req.body.rate,
    subcribe: req.body.subcribe,
    description: req.body.description,
    created_at: req.body.created_at,
    chapters: req.body.chapters,
  });

  return commic
    .save()
    .then((newCommic) => {
      return res.status(201).json({
        success: true,
        message: "New commic created successfully",
        Commic: newCommic,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
        Commics: commic,
      });
    });
}

export function getAllCommic(req, res) {
  //   if (res.body.params) {
  //     console.log(res.body.params);
  //   }
  //   const page = res.body.params?.page;
  //   const limit = res.body.params?.limit;

  Commic.find()
    // .select("")
    .then((allCommic) => {
      // if (page * limit < allCourse.length) {
      //   console.log("a");
      // }
      // const { _id, name, another_name, chapters, commic_img } = allCommic;
      // const resCommic = { _id, name, another_name, chapters, commic_img };

      return res.status(200).json(
        //   {
        // success: true,
        // message: "A list of all course",
        // Commic: allCommic,
        //   }
        allCommic
      );
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

export function getCommic(req, res) {
  if (!req.params) {
    res.send("False Params");
  }
  const commic_id = req.params.id;

  Commic.findById(commic_id)
    .then((commic) => {
      res.status(200).json(commic);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        commic_id: commic_id,
      });
    });
}

export function getChapter(req, res) {
  if (!req.params) {
    res.send("False Params");
  }

  const commic_id = req.params.id;
  const chapter_num = req.params.chapter_number;

  Commic.findById(commic_id)
    .then((commic) => {
      const chap = commic.chapters.find((chapter, id, obj) => {
        return chapter.chapter_number == chapter_num;
      });
      return chap;
      // res.status(200).json(chap);
    })
    .then((singleChapter) => {
      res.status(200).json(singleChapter);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "This chapter does not exist",
        error: error.message,
      });
    });
}

export function searchCommic(req, res) {
  if (!req.query) res.status(201).send("no query");
  // res.status(200).send(req.query);

  Commic.find({ name: { $regex: ".*" + req.query.name + ".*" } })
    .select("name another-name description")
    .then((allCommic) => {
      return res.status(200).json(allCommic);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
