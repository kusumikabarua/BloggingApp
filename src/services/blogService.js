const Blog = require("../models/Blog");
const createBlog = async (blogData) => {
  try {
    console.log("Create");
    const blog = await Blog.create(blogData);
    return blog;
  } catch (error) {
    throw error;
  }
};
const getAllBlogs= async (userIdFromToken) => {
  try {
    let blogs = await Blog.find();
   
    for(let i=0;i<blogs.length;i++){
     let {_id,title,description,userId} =blogs[i];
      if(blogs[i].userId ==userIdFromToken){
        blogs[i]= {_id,title,description,userId,isUpdateDelete:true};
      }else{
        blogs[i]= {_id,title,description,userId,isUpdateDelete:false};
      }
    }
    return blogs;
  } catch (error) {
    throw error;
  }
};

const updateBlog = async (userId, blogId, updatedData) => {
  try {
    console.log("Update");
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
