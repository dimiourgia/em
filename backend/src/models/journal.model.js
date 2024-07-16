const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  // subHeadings: [{ type: String }],
  images: [{ type: String }],
  authorName: { type: String, required: true },
  content: [{ 
    subHeading: { type: String },
    text: { type: String },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Journal', JournalSchema);
