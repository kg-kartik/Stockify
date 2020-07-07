const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const requireLogin = require("../Authentication/requireLogin");


//Pushing the stockData to the users srray
// Post /stocks/update
// @Protected
router.post("/create",requireLogin,(req,res) => {
   
    User.findByIdAndUpdate(req.user._id,{
        $push : {
            stockData : req.body
        }},{
            new : true,
            runValidators: true
        }).then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(422).json(err);
        })
    })

//Updating the stockData using the particular stock id
// POST /stocks/update
// @Protected
// router.post("/update",requireLogin,(req,res) =>{
//     User.findByIdAndUpdate(req.user.id)
//     .then(() => {
//         User.update({"stockData._id": req.body._id}, {$set: {
//             'stockData.$.name': req.body.name,
//             'stockData.$.quantity': req.body.quantity,
//             'stockData.$.price': req.body.price
//         }}).then((user) => {
//             res.status(200).json(user);
//         }).catch((err) => {
//             res.status(422).json(err);
//         })
//     }).catch((err) => {
//         res.json(err);
//     })
// })

router.post("/update",requireLogin,(req,res) => {
    const {_id,name,quantity,price} = req.body;

    const stockData = {
        _id,
        name,
        quantity,
        price
    }

    User.findById(req.user._id)
    .then((user) => {
        user.stockData = user.StockData.filter((stock) => {
            stock._id !== req.body._id 
        })
        console.log(user,"hello");
        user.stockData = stockData;
        user.save()
        .then((user) => {
            res.json(user);
        })
    }).catch((err) => {
        res.json(err);
    })
})

//Deleting a particular stock item
// Post /stocks/delete
// @Protected
router.post("/delete",requireLogin,(req,res) => {
    User.findById(req.user._id)
    .then(() => {
        User.update({'stockData._id': req.body._id}, {'$unset': {
            'stockData.$._id': "",
            'stockData.$.name': "",
            'stockData.$.quantity': "",
            'stockData.$.price': ""
        }}).then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(422).json(err);
        })
    })
})


module.exports = router;