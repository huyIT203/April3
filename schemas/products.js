let mongoose = require('mongoose');
let slugify = require('slugify');
let categoryModel = require('./category');

// Tạo slug cho Product
const generateSlug = (name) => {
    return slugify(name, { lower: true, strict: true });
};

let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: "",
    },
    urlImg: {
        type: String,
        default: "",
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Trước khi lưu vào DB, tự động tạo slug
productSchema.pre('save', function(next) {
    this.slug = generateSlug(this.name);
    next();
});

module.exports = mongoose.model('Product', productSchema);
