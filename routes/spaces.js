var express = require("express");
var router = express.Router();
var Space = require("../models/space");
var mongoose = require("mongoose");
var multer = require("multer");
var upload = multer({ dest: `${__dirname}/../uploads/` });


router.get("/spaces", (req, res) => {
  Space.find({})
    .then(space => {
      res.render("spaces", { space });
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/spaces/create", (req, res) => {
  res.render("space-create");
});

router.post("/spaces/create", upload.single("spaceImage"), (req, res) => {
  console.log(req.body)
  Space.create({
    name: req.body.name,
    location: req.body.location,
    image: req.file.filename,
    description: req.body.description,
    // owner: mongoose.Types.ObjectId(req.body.id)
  })
    .then((space) => {
      res.redirect(`/spaces/${space.id}`);
      console.log("saved!")
    })
    .catch(err => {
      res.send(err);
    })
})

router.get("/spaces/:spaceId", (req, res) => {
  Space.findById(req.params.spaceId)
    .then((space) => {
      res.render("space-details", { space })
    })
    .catch((err) => {
      res.send(err)
    });
});





module.exports = router;