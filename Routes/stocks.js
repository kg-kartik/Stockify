const express = require("express");
const router = express.Router();
const Stock = require("../Models/Stock");
const {requireLogin} = require("../Authentication/requireLogin");

router.post("/create",(req,res) => {
    const {name,quantity,price} = req.body;
    const newStock = new Stock({
        name,
        quantity,
        price
    })
    newStock.save()
    .then((stock) => {
        res.status(200).json(stock);
    }).catch((err) => {
        res.status(422).json(err);
    })
})


router.post("/update",(req,res) =>{
    Stock.findByIdAndUpdate(req.body._id,req.body,{
        new : true,
        runValidators : true
    }).then((stock) => {
        res.status(200).json(stock);
    }).catch((err) => {
        res.status(401).json(err);
    })
})

router.post("/delete",(req,res) => {
    Stock.findByIdAndDelete(req.body._id)
    .then(() => {
        res.status(200).json({
            msg : "Deleted stock"
        })
    }).catch((err) => {
        res.status(401).json(err);
    })
})

module.exports = router;