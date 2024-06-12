const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
  try {
    let level = await Category.findOne({ name: reqData.productCategory });
    if (!level) {
      const newLevel = new Category({
        name: reqData.productCategory,
      });
      level = await newLevel.save();
    }

    const product = new Product({
      title: reqData.title,
      color: reqData.color,
      description: reqData.description,
      discountedPrice: reqData.discountedPrice,
      imageUrl: reqData.imageUrl,
      brand: reqData.brand,
      price: reqData.price,
      sizes: reqData.size,
      category: level._id,
    });
    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
}

async function deleteProduct(productId) {
  try {
    const product = await findProductById(productId);
    if (!product) {
      throw new Error("Product not found with id: " + productId);
    }
    await Product.findByIdAndDelete(productId);
    const products = await Product.find({});
    return { message: "Product deleted successfully", products };
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
}

// Update a product by ID
async function updateProduct(productId, reqData) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);
  return updatedProduct;
}

// Find a product by ID
async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();

  if (!product) {
    throw new Error("Product not found with id " + id);
  }
  return product;
}

async function getAllProducts() {
  try {
    const query = await Product.find({}).exec();
    console.log("The query result:", query);
    return query;
  } catch (error) {
    console.error("Error occurred while executing the query:", error);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
};
