const Comment = require("../models/Comment");
const createComment = async (commentData) => {
  try {
    const comment = await Comment.create(commentData);
    return comment;
  } catch (error) {
    throw error;
  }
};
const getAllCommentsByBlogId= async (blogId) => {
  try {
    const comments = await Comment.find({blogId:blogId});
    return comments;
  } catch (error) {
    throw error;
  }
};

const updateComment = async (userId,commentId, blogId, updatedData) => {
  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { userId: userId, _id: commentId,blogId: blogId },
      { $set: updatedData },
      { new: true }
    );

    return updatedComment;
  } catch (error) {
    throw error;
  }
};
const deleteComment = async (userId,commentId, blogId) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete( { userId: userId, _id: commentId,blogId: blogId });
    return deletedComment;
  } catch (error) {
    throw error;
  }
};
module.exports = {
    createComment,
    getAllCommentsByBlogId,
    deleteComment,
    updateComment
  };