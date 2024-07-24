// collectionController.js
const collectionService = require("../services/collection.service.js");

// Find a product by ID
async function findCollectionById(req, res) {
  try {
    const collectionId = req.params.id;
    const collection = await collectionService.getCollectionById(collectionId);
    return res.status(200).send(collection);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

async function getAllCollections(req, res) {
  try {
    const collections = await collectionService.getAllCollections();
    return res.status(200).send(collections);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function createCollection(req, res){
    try{
        const collection = await collectionService.createCollection({name:req.body.name, description:req.body.description, imageUrls:req.body?.imageUrl??[], products:req.body?.proucts??[]});
        return res.status(201).send(collection);
    } catch(err){
        return res.status(500).json({error: err.message});
    }
}

module.exports = {
    getAllCollections,
  findCollectionById,
  createCollection,
};
