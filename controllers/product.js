import { json } from "express";
import Product from "../models/product.js"; // make sure the path and extension are right

// Insert a product
export const input = async (req, res) => {
  try {
    const { productName, productPrice, stock, brand, description, category } = req.body;

    // Check for missing fields
    if (!productName || !productPrice || !stock || !brand || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please insert all the fields!",
      });
    }

    // Check if product already exists (by name, for example)

    // Create the product
    const product = await Product.create({
      productName,
      productPrice,
      stock,
      brand,
      description,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Product create successfully!",
      data: product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get Product By id

export const getproduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found!",
            });
        }

        res.status(200).json({
            success:true,
            message:"product get successFully",
            data:product,
        });
        
    } catch (error) {
        return res.status(500),json({
            success:false,
            message: error.message,
        });
    }
};

//update Product
export const updateProduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found!"
            });
        }
        const{productName, productPrice, stock,brand,description,category}=req.body;
        product.productName=productName;
        product.productPrice=productPrice;
        product.stock=stock;
        product.brand=brand;
        product.description=description;
        product.category=category;

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
          });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found!",
        });
      }
  
      await product.deleteOne(); // or product.remove();
  
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  