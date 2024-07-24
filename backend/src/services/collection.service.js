const Collections = require("../models/collection.model.js");

async function createCollection({name, description, imageUrls, products}) {
  try {
    // Create a new collection instance
    const newCollection = new Collections({
      name,
      description,
      products, // Initialize with an empty array of products
      imageUrl: imageUrls,
    });

    // Save the collection to the database
    const savedCollection = await newCollection.save();

    // Return the saved collection
    return savedCollection;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating collection");
  }
}

async function getCollectionIdByName(name) {
  try {
    // Find the collection by its name
    const collection = await Collections.findOne({ name });
    if (!collection) {
      throw new Error("Collection not found");
    }

    // Return the collection ID
    return collection._id;
  } catch (error) {
    throw new Error("Error retrieving collection ID");
  }
}

async function addProductToCollection(collectionId, productId) {
  try {
    // Find the collection by its ID
    const collection = await Collections.findById(collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }

    // Add the product ID to the collection's products array
    collection.products.push(productId);

    // Save the updated collection
    await collection.save();

    // Return a success message or the updated collection
    return collection;
  } catch (error) {
    throw new Error("Error adding product to collection");
  }
}

async function deleteProductFromCollection(collectionId, productId) {
  try {
    // Find the collection by its ID
    const collection = await Collections.findById(collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }

    // Remove the product ID from the collection's products array
    collection.products = collection.products.filter(
      (product) => product.toString() !== productId
    );

    // Save the updated collection
    await collection.save();

    // Return a success message or the updated collection
    return collection;
  } catch (error) {
    throw new Error("Error deleting product from collection");
  }
}

async function getAllCollections() {
  try {
    // Retrieve all collections
    const collections = await Collections.find();

    // Return the collections
    return collections;
  } catch (error) {
    throw new Error("Error retrieving all collections");
  }
}

async function getCollectionById(collectionId) {
  try {
    // Find the collection by its ID
    const collection = await Collections.findById(collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }

    // Return the collection
    return collection;
  } catch (error) {
    throw new Error("Error retrieving collection by ID");
  }
}

module.exports = {
  addProductToCollection,
  deleteProductFromCollection,
  getCollectionIdByName,
  createCollection,
  getAllCollections,
  getCollectionById,
};
