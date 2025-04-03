const slugify = require('slugify');

// Example function to generate slug
const generateSlug = (name) => {
    return slugify(name, {
        lower: true,       // Converts the string to lowercase
        strict: true       // Removes special characters
    });
};
