var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const Product = require('../models/Product')
const Member = require('../models/Member');
const { isHttpError } = require('http-errors');

router.post('/addProduct', async function (req, res) {
  const { memberId, productName, productDesc, productPrice
    , productImage } = req.body

  if (memberId == null || memberId.length <= 0) {
    res.status(403).json({
      msg: 'please fill memberId',
      result: {}
    })
  }

  if (productName == null || productName.length <= 0) {
    res.status(403).json({
      msg: 'please fill productName',
      result: {}
    })
  }

  if (productDesc == null || productDesc.length <= 0) {
    res.status(403).json({
      msg: 'please fill productDesc',
      result: {}
    })
  }

  if (productPrice == null || productPrice.length <= 0) {
    res.status(403).json({
      msg: 'please fill productPrice',
      result: {}
    })
  }

  if (productImage == null || productImage.length <= 0) {
    res.status(403).json({
      msg: 'please fill productImage',
      result: {}
    })
  }

  Member.findById(memberId, async function (err, member) {
    if (err) {
      res.status(403).json({
        "msg": "memberId is not found"
      })
    } else {
      const product = new Product(req.body)
      await product.save()

      res.status(200).json({
        msg: 'success',
        result: { product }
      })
    }
  })
});

router.get('/getAllProduct', async (req, res) => {
  const products = await Product.find({})
  if (products) {
    res.status(200).json({
      msg: 'success',
      result: products
    })
  } else {
    res.status(403).json({
      msg: 'not found product',
      result: {}
    })
  }
})

router.delete("/deleteProductById", async (req, res) => {
  const { memberId, productId } = req.body

  if (memberId == null || memberId.length <= 0) {
    res.status(403).json({
      msg: 'please fill memberId',
      result: {}
    })
  }

  if (productId == null || productId.length <= 0) {
    res.status(403).json({
      msg: 'please fill productId',
      result: {}
    })
  }

  Product.findById(productId, async (err, product) => {
    if (err) {
      res.status(403).json({
        "msg": "not found product",
        "result": {}
      })
    } else {
      if (product.memberId == memberId) {
        await Product(product).deleteOne()
        res.status(200).json({
          "msg": "delete success",
          "result": {}
        })
      } else {
        console.log('2')
        res.status(403).json({
          "msg": "not found product",
          "result": {}
        })
      }
    }
  })
})

router.post('/getProductById', async (req, res) => {
  const { memberId } = req.body

  if (memberId == null || memberId.length <= 0) {
    res.status(403).json({
      msg: 'please fill memberId',
      result: {}
    })
  }

  Member.findById(memberId,(err,member) =>{
    if(err){
      res.status(401).json({
        msg: 'not found member',
        result: {  }
      })
    }else{
      Product.find({memberId : memberId},async (err,product) => {
        if(err){
          res.status(403).json({
            msg: 'not found product',
            result: {  }
          })
        }else{
          res.status(200).json({
            msg: 'success',
            result: product
          })
        }
      })
    }
  })

  // Product.find({ _id: mongoose.Types.ObjectId(memberId) }, async (err, product) => {
  //   if (err) {
  //     res.status(403).json({
  //       "msg": "not found products",
  //       result: {}
  //     })
  //   } else {
  //     res.status(200).json({
  //       msg: 'success',
  //       result: { product }
  //     })
  //   }
  // })

})

module.exports = router;
