const blogService = require("../services/blogService");
const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    console.log("userId", userId);
    const blog = await blogService.createBlog({
      title,
      description,
      userId,
    });
    return res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData =req.body;

    const updatedBlog = await blogService.updateBlog(req.user.id, id,updatedData);
    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteBLog = async(req,res)=>{
    try {
    const {id} =req.params;
    const deletedBlog = await blogService.deleteBLog(req.user.id,id);
    if(!deletedBlog){
        res.status(404).json({ message: "Blog not found" });
    }
    res.status(204).send();
} catch (error) {
    res.status(500).json({ message: error.message });
  }

}
module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBLog
};