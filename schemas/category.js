let mongoose = require('mongoose');
let slugify = require('slugify');

// Tạo slug cho Category
const generateSlug = (name) => {
    return slugify(name, { lower: true, strict: true });
};

let categorySchema = mongoose.Schema({
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
    description: {
        type: String,
        default: "",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Trước khi lưu vào DB, tự động tạo slug
categorySchema.pre('save', function(next) {
    this.slug = generateSlug(this.name);
    next();
});

module.exports = mongoose.model('Category', categorySchema);
