const mongoose = require('mongoose'); 
const subcategorySchema = require('./subcategorySchema');

// Declare the Schema of the Mongo model
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
   description:{
    type:String,
   },
   Subcategory:[{
     type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
   }]
});

// This middleware will run *before* a category is deleted
categorySchema.pre("findOneAndDelete", async function (next) {
    const categoryId = this.getQuery()["_id"];
    try {
      await subcategorySchema.deleteMany({ category: categoryId });
      next();
    } catch (error) {
      next(error);
    }
  });
  

//Export the model
module.exports = mongoose.model('category', categorySchema);