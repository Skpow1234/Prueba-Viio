import axios from 'axios';
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }).populate("user");
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newProduct = new Product({
      title,
      description,
      date,
      user: req.user.id,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const productUpdated = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }
    );
    return res.json(productUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Additional function to make an internal HTTPS call
export const fetchCarts = async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/carts');
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
