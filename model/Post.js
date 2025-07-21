import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: String,
  description: String,
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
