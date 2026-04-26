const Blog = require("../models/Blog");
const { slugify } = require("../utils/seoHelper");

// Create Blog
exports.createBlog = async (req, res) => {
  try {

    const slug = slugify(req.body.title);

    const data = await Blog.create({
      ...req.body,
      slug
    });

    res.status(201).json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Blogs
exports.getBlogs = async (req, res) => {
  res.json(await Blog.find().sort({ createdAt: -1 }));
};

// Get Single Blog
exports.getBlogBySlug = async (req, res) => {
  res.json(await Blog.findOne({ slug: req.params.slug }));
};

// Update Blog
exports.updateBlog = async (req, res) => {
  res.json(await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ));
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog Deleted" });
};
