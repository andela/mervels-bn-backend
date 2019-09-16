import express from "express";

const router = express.Router();
router.use("/auth", require("./users"));
router.use("/requests", require("./requests"));
router.use("/accommodations", require("./accommodations"));

router.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      message: "Validation Failed",
      status: 422,
      errors: Object.keys(err.details).reduce(
        (errors, key) => err.details[key].message,
        {}
      )
    });
  }

  return next(err);
});
router.use((err, req, res, next) => {
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(404).json({
      status: 404,
      errors: err.parent.detail
    });
  }

  return next(err);
});

module.exports = router;
