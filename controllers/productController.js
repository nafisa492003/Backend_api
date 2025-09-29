const productSchema = require("../models/productSchema");

const createProduct = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    const { name, description, price, color, category, subcategory } = req.body;
    if (!name || !price || !category) {
      console.log("req.body:", req.body);
      console.log("req.file:", req.file);

      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }
    // Cloudinary image URL
    const image = req.file ? req.file.path : null;
    const newProduct = new productSchema({
      name,
      description,
      price,
      color,
      image,
      category,
      subcategory,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// function for update products
const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const product = await productSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// function for get all products
const getAllProduct = async (req, res) => {
  try {
    const products = await productSchema.find({})
      .populate("category", "name")
      .populate("subcategory", "name");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// function for Get Singal products
const getSingalproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const singalCategory = await productSchema.findById({ _id: id });

    res.status(200).json(singalCategory);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
// function for delete catagory product
const Deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productSchema.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Catagory product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  createProduct,
  UpdateProduct,
  getAllProduct,
  getSingalproduct,
  Deleteproduct,
};
