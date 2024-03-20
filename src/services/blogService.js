const Blog = require("../models/Blog");
const createBlog = async (blogData) => {
  try {
    const blog = await Blog.create(blogData);
    return blog;
  } catch (error) {
    throw error;
  }
};
const getAllBlogs= async () => {
  try {
    const blogs = await Blog.find();
    return blogs;
  } catch (error) {
    throw error;
  }
};

const updateBlog = async (userId, blogId, updatedData) => {
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { userId: userId, _id: blogId },
      { $set: updatedData },
      { new: true }
    );

    return updatedBlog;
  } catch (error) {
    throw error;
  }
};
const deleteBLog = async (userId, blogId) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete({ userId, _id: blogId });
    return deletedBlog;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBLog
};
