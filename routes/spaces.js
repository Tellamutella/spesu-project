var express = require("express");
var router = express.Router();
var Space = require("../models/space");
var mongoose = require("mongoose");
var multer = require("multer");
var upload = multer({ dest: `${__dirname}/../uploads/` });
const Booking = require("../models/booking");
const axios = require("axios");

router.get("/spaces", (req, res) => {
  if (req.session.currentUser) {
    Booking.find({ tenant: req.session.currentUser._id })
      .populate("space")
      .then(bookin => {
        Space.find({})
          .then(space => {
            newArr = [];
            space.forEach(element => {
              let check = {
                name: element.name,
                long: element.long,
                lat: element.lat
              };
              newArr.push(check);
            });
            res.render("spaces", {
              space: space,
              booked: bookin,
              cord: JSON.stringify(newArr)
            });
          })
          .catch(err => {
            res.send(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    Space.find({})
      .then(space => {
        newArr = [];
        space.forEach(element => {
          let check = {
            name: element.name,
            time: element.location,
            long: element.long,
            lat: element.lat
          };
          newArr.push(check);
        });
        res.render("spaces", { space, cord: JSON.stringify(newArr) });
      })
      .catch(err => {
        res.send(err);
      });
  }
});

router.get("/spaces/create/", (req, res) => {
  res.render("space-create");
});

router.post("/spaces/create", upload.single("spaceImage"), (req, res) => {
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.address}.json?access_token=${access_token}`
    )
    .then(response => {
      Space.create({
        name: req.body.name,
        location: `${req.body.start}-${req.body.end}`,
        image: req.file.filename,
        description: req.body.description,
        owner: mongoose.Types.ObjectId(req.session.currentUser._id),
        address: req.body.address,
        long: response.data.features[0].geometry.coordinates[0],
        lat: response.data.features[0].geometry.coordinates[1]
      })
        .then(space => {
          res.json({ spaceId: space.id });
          console.log("saved!");
        })
        .catch(err => {
          res.send(err);
        });
    });
});

router.get("/spaces/:spaceId", (req, res) => {
  Space.findById(req.params.spaceId)
    .then(space => {
      res.render("space-details", {
        space,
        data: JSON.stringify(space.coordinates)
      });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
