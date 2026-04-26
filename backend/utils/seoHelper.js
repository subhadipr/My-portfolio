// Slug Generator
exports.slugify = (text) => {

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // space → dash
    .replace(/[^\w\-]+/g, "")   // remove special char
    .replace(/\-\-+/g, "-");    // multi dash → single

};
