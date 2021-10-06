export function validPaginate(req, res, next) {
  let page = req.query?._page;
  let limit = req.query?._limit;

  if (typeof page == "string" && typeof limit == "string") {
    page = Number.parseInt(page);
    limit = Number.parseInt(limit);
  }

  if (
    typeof page == "number" &&
    typeof limit == "number" &&
    page >= 0 &&
    limit >= 1
  ) {
    res.locals.paginate = true;
    res.locals.page = page;
    res.locals.limit = limit;

    console.log("_page" + page);
    console.log("_limit" + limit);
  } else {
    res.locals.paginate = false;
  }

  next();
}
