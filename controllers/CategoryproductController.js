const categorySchema = require("../models/categorySchema");
const subcategorySchema = require("../models/subcategorySchema");

// function for creating products
const createCategory = async (req, res) => {
  const { name, description, Subcategory } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Required fields are missing" });
    }
    const existingCategory = await categorySchema.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ error: "This name is already used please use another name" });
    }
    const product = new categorySchema({
      name,
      description,
      Subcategory,
    });
    await product.save();
    res.status(201).json({ message: "category created", product });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// function for update categories
const UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const product = await categorySchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// function for get all products
const getAllCategory = async (req, res) => {
  try {
    const products = await categorySchema.find({}).populate("name");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// function for Get Singal products
const getSingalCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const singalCategory = await categorySchema.findById({ _id: id });

    res.status(200).json(singalCategory);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
// function for delete catagory product
const DeleteCatagory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await categorySchema.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Catagory product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  createCategory,
  getAllCategory,
  getSingalCategory,
  UpdateCategory,
  DeleteCatagory,
};
