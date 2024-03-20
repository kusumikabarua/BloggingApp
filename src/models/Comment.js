const commentSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
        required: true,
      },
      blogId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Blog",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );
  const Comment = mongoose.model("Blog",commentSchema);
  module.exports =Comment;
  