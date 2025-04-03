let productModel = require('../schemas/products');
let categoryModel = require('../schemas/category');
let { CreateSuccessRes, CreateErrorRes } = require('../utils/responseHandler');

// Lấy tất cả Products
exports.getAllProducts = async function(req, res, next) {
    try {
        let products = await productModel.find({ isDeleted: false }).populate("category");
        CreateSuccessRes(res, products, 200);
    } catch (error) {
        next(error);
    }
};

// Lấy Product theo slug
exports.getProductBySlug = async function(req, res, next) {
    try {
        let category = await categoryModel.findOne({ slug: req.params.slugcategory, isDeleted: false });
        if (!category) {
            return CreateErrorRes(res, "Category not found", 404);
        }

        let product = await productModel.findOne({ slug: req.params.slugproduct, isDeleted: false, category: category._id }).populate("category");
        if (!product) {
            return CreateErrorRes(res, "Product not found", 404);
        }

        CreateSuccessRes(res, product, 200);
    } catch (error) {
        next(error);
    }
};
