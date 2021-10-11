import mongoose from "mongoose";
import db from "../models/index.js";

const Comic = db.Comic;
const Author = db.Author;
const Chapter = db.Chapter;

export function getAllComic(req, res) {
  const paginate = res.locals.paginate;
  // if (res.locals.paginate) {
  const page = res.locals.page;
  const limit = res.locals.limit;
  // }

  Comic.find()
    .populate("authorId", "-__v")
    // .select("_id name ")
    .then((allComic) => {
      if (paginate && (page - 1) * limit < allComic.length) {
        const items = allComic.filter((comic, index, arr) => {
          if (index >= (page - 1) * limit && index < page * limit) return true;
          return false;
        });
        return res.status(200).json({
          success: true,
          message: "A list of comic",
          _page: page,
          _limit: limit,
          Comic: items,
        });
      } else if (paginate) {
        return res.status(200).json({
          success: false,
          message: "out of range",
          page: page,
          limit: limit,
          Comic: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: "A list of all comic",
        Comic: allComic,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

export async function createComic(req, res) {
  const authorName = req.body.author;

  const comic = new Comic({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name || "",
    anotherName: req.body.anotherName || "",
    authorId: null,
    comicImg: req.body.comicImg || "",
    status: req.body.status || "",
    genres: req.body.genres || [],
    views: req.body.views || 0,
    rate: req.body.rate || 0,
    subcribe: req.body.subcribe || 0,
    description: req.body.description || "",
    chapters: [],
  });

  // if has author name
  if (authorName) {
    const newAuthor = Author({
      _id: mongoose.Types.ObjectId(),
      name: authorName,
      comic: [comic._id],
    });
    // find author
    const author = await Author.findOne({ name: authorName });
    let result = author?._id || null;
    // // if not found, add new author
    if (!result) {
      result = await newAuthor.save().then((author) => author._id);
    }
    comic.authorId = result;
    console.log(result);
  }

  // find comic in db
  const rs = await Comic.findOne({ name: comic.name });

  if (!rs) {
    // save comic
    comic
      .save()
      .then((comic) => {
        res.status(201).json({
          success: true,
          message: "Add new comic successfully!",
          comic,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  } else {
    res.status(201).json({
      success: false,
      message: "Comic is exists!",
      comic: rs,
    });
  }
}

export function getOneComic(req, res) {
  const _id = req.params?.id;
  let filter = null;

  const paginate = res.locals.paginate;
  const page = res.locals.page;
  const limit = res.locals.limit;

  if (_id) {
    filter = { _id };
    console.log(_id);
  }

  Comic.findOne(filter)
    .populate("authorId", "-__v")
    .exec((err, comic) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
        return;
      }
      if (comic) {
        Chapter.find({ comicId: comic._id }).exec((err, chapters) => {
          if (paginate && (page - 1) * limit < chapters.length) {
            const items = chapters.filter((chapter, index, arr) => {
              if (index >= (page - 1) * limit && index < page * limit)
                return true;
              return false;
            });
            return res.status(200).json({
              success: true,
              message: "A list of comic",
              _page: page,
              _limit: limit,
              comic: comic,
              chapters: items,
            });
          } else if (paginate) {
            return res.status(200).json({
              success: false,
              message: "out of range",
              page: page,
              limit: limit,
              comic: null,
              chapters: null,
            });
          }

          res.status(200).json({
            success: false,
            message: "Found!",
            comic: comic,
            chapters,
          });
        });

        return;
      }
      res.status(404).json({
        success: false,
        message: "Not found!",
      });
    });
}

export function updateComic(req, res) {
  // const _id = req.body._id;
  // const name = req.body.name;
  const change = req.body;
  // let filter = null;

  // if (_id) {
  //   filter = { _id };
  // } else {
  //   filter = { name };
  // }

  const _id = req.params?.id;
  let filter = null;

  if (_id) {
    filter = { _id };
    console.log(_id);
  }

  Comic.updateOne(filter, change)
    .populate("authorId")
    .exec((err, comic) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
        return;
      }
      if (comic) {
        res.status(200).json({
          success: true,
          message: "Found!",
          Comic: comic,
        });
        return;
      }
      res.status(404).json({
        success: false,
        message: "Not found!",
      });
    });
}

export async function deleteComic(req, res) {
  // comicid
  const _id = req.params?.id;
  const ERR = [];

  let authorId = null;
  let author = null;

  await Comic.findOne({ _id }).then((comic) => {
    if (comic) authorId = comic.authorId;
  });

  if (authorId)
    await Author.findOne({ _id: authorId }).then((result) => {
      author = result;
    });
  console.log(authorId);
  console.log(author);

  // await Comic.deleteOne({ _id }).catch(ERR.push(ERR.message));

  // await Author.updateOne({_id: authorId}, {...author, author?.comic.filter((item) => {
  // return item != _id;
  // })})

  // , (err, comic) => {
  //   if (err) {
  //     res.status(500).json({
  //       success: false,
  //       message: err.message,
  //     });
  //     return;
  //   }
  //   if (comic) {
  //     res.status(200).json({
  //       success: true,
  //       message: "Delete successfully!",
  //       Comic: comic,
  //     });
  //     return;
  //   }
  //   res.status(404).json({
  //     success: false,
  //     message: "Not found!",
  //   });
  // }

  const result = {
    success: true,
    message: ERR.length ? "Delete Successfully" : "Error",
    error: ERR,
  };

  res.status(ERR.length ? 201 : 400).json(result);
}

export async function searchComic(req, res) {
  let filter = {
    name: req.body.name,
    status: req.body.status,
  };

  if (req.body.genres?.length) {
    filter = { ...filter, genres: { $in: req.body.genres } };
  }

  if (req.body.author) {
    const authorName = req.body.author;
    await Author.findOne({ name: authorName }).exec((err, author) => {
      if (author) {
        filter.authorId = author._id;
      }
    });
  }

  Comic.find(filter)
    // .populate("authorId", "-__v")
    .exec((err, commicList) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message,
          query: filter,
        });
        return;
      }
      if (commicList.length) {
        res.status(200).json({
          success: true,
          message: "Found!",
          query: filter,
          comics: commicList,
        });
        return;
      }
      res.status(500).json({
        success: false,
        message: "Not found",
        query: filter,
      });
    });
  // res.status(200).json({});
}

// export function createComic(req, res) {
//   const authorName = req.body.author;

//   const comic = new Comic({
//     _id: mongoose.Types.ObjectId(),
//     name: req.body.name,
//     anotherName: req.body.anotherName,
//     authorId: null,
//     comicImg: req.body.comicImg,
//     status: req.body.status,
//     genres: req.body.genres,
//     views: req.body.views,
//     rate: req.body.rate,
//     subcribe: req.body.subcribe,
//     description: req.body.description,
//     chapters: [],
//   });

//   console.log(comic);

//   Comic.findOne({ name: req.body.name }, (err, newComic) => {
//     if (newComic) {
//       res.status(500).json({
//         success: false,
//         message: "Comic is exists",
//       });
//     } else {
//       comic.save((err, comic) => {
//         if (err) {
//           res.status(500).json({
//             success: false,
//             message: "Server error. Please try again.",
//             error: err.message,
//             Comic: comic,
//           });
//         }

//         if (authorName) {
//           Author.findOne(
//             {
//               name: authorName,
//             },
//             (err, author) => {
//               if (err) {
//                 res.status(500).json({
//                   success: false,
//                   message: "Server error. Please try again.",
//                   error: err.message,
//                   Comic: comic,
//                 });
//               }

//               if (author) {
//                 comic.authorId = author._id;
//                 console.log(comic.authorId.name);
//                 author.comic.push(comic._id);
//                 author.save().then(() => {
//                   comic.save((err) => {
//                     if (err) {
//                       res.status(500).json({
//                         success: false,
//                         message: "Server error. Please try again.",
//                         error: err.message,
//                         Comic: comic,
//                       });
//                     }
//                     res.status(201).json({
//                       success: true,
//                       message: "New comic created successfully",
//                       Comic: comic,
//                     });
//                   });
//                 });
//               } else {
//                 const newAuthor = Author({
//                   name: authorName,
//                   comic: [comic?._id],
//                 });
//                 newAuthor.save().then((err, author) => {
//                   comic.authorId = author._id;
//                   comic.save((err) => {
//                     if (err) {
//                       res.status(500).json({
//                         success: false,
//                         message: "Server error. Please try again.",
//                         error: err.message,
//                         Comic: comic,
//                       });
//                     }
//                     res.status(201).json({
//                       success: true,
//                       message: "New comic created successfully",
//                       Comic: comic,
//                     });
//                   });
//                 });
//               }
//             }
//           );
//         } else {
//           comic.save((err, comic) => {
//             res.status(201).json({
//               success: true,
//               message: "New comic created successfully",
//               Comic: comic,
//             });
//           });
//         }
//       });
//     }
//   });
// }
