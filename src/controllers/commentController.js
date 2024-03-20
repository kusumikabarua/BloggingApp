const commentService = require("../services/commentService");
const createComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, description } = req.body;
    const userId = req.user.id;
    console.log("userId", userId);
    const comment = await commentService.createComment({
      title,
      description,
      userId,
      blogId
    });
    return res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await commentService.getAllCommentsByBlogId(blogId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id,blogId } = req.query;
    const updatedData =req.body;

    const updatedComment = await commentService.updateComment(req.user.id, id,blogId,updatedData);
    if (!updatedComment) {
      res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteComment = async(req,res)=>{
    try {
    const { id ,blogId } = req.query;
    const deletedComment = await commentService.deleteComment(req.user.id,id,blogId);
    if(!deletedComment){
        res.status(404).json({ Comment: "Comment not found" });
    }
    res.status(204).send();
} catch (error) {
    res.status(500).json({ message: error.message });
  }

}
module.exports = {
  createComment,
  getAllCommentsByBlogId,
  deleteComment,
  updateComment
};