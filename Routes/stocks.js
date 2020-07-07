const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const requireLogin = require("../Authentication/requireLogin");

//Pushing the stockData to the users srray
// Post /stocks/update
// @Protected
router.post("/create", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        stockData: req.body,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(422).json(err);
    });
});

//Updating the stockData using the particular stock id
// POST /stocks/update
// @Protected
// router.post("/update", requireLogin, (req, res) => {
//   User.findByIdAndUpdate(req.user.id)
//     .then(() => {
//       User.update(
//         { "req.user.stockData[0]._id": req.body._id },
//         {
//           $set: {
//             "req.user.stockData[0].$.name": req.body.name,
//             "req.user.stockData[0].$.quantity": req.body.quantity,
//             "req.user.stockData[0].$.price": req.body.price,
//           },
//         },
//         { $new: true }
//       )
//         .then((user) => {
//           res.status(200).json(user);
//         })
//         .catch((err) => {
//           res.status(422).json(err);
//         });
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

router.post("/update", requireLogin, (req, res) => {
  console.log(req.user);
  User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        "req.user.stockData[0].$.name": req.body.name,
        "req.user.stockData[0].$.quantity": req.body.quantity,
        "req.user.stockData[0].$.price": req.body.price,
      },
    },
    { $new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "You are not authorized to update the stocks",
        });
      }
      return res.json({ user });
    }
  );
});
//Deleting a particular stock item
// Post /stocks/delete
// @Protected
router.post("/delete", requireLogin, (req, res) => {
  User.findById(req.user._id).then(() => {
    User.update(
      { "stockData._id": req.body._id },
      {
        $unset: {
          "stockData.$._id": "",
          "stockData.$.name": "",
          "stockData.$.quantity": "",
          "stockData.$.price": "",
        },
      }
    )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  });
});

module.exports = router;
