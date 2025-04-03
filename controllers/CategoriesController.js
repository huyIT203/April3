let categoryModel = require('../schemas/category');
let { CreateSuccessRes, CreateErrorRes } = require('../utils/responseHandler');

// Lấy tất cả Category
exports.getAllCategories = async function(req, res, next) {
    try {
        let categories = await categoryModel.find({ isDeleted: false });
        CreateSuccessRes(res, categories, 200);
    } catch (error) {
        next(error);
    }
};

// Lấy Category theo slug
exports.getCategoryBySlug = async function(req, res, next) {
    try {
        let category = await categoryModel.findOne({ slug: req.params.slug, isDeleted: false });
        if (!category) {
            return CreateErrorRes(res, "Category not found", 404);
        }
        CreateSuccessRes(res, category, 200);
    } catch (error) {
        next(error);
    }
};
