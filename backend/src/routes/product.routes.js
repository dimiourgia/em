const express=require("express");
const router=express.Router();
const productController=require("../controllers/product.controller.js");

router.get('/', productController.getAllProducts);
router.get('/:id', productController.findProductById);


module.exports = router;