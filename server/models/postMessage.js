import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  // we save file in string beacuse we're converting image into string with 'base64'
  selectedFile: String,
  // type == string because we're storing the id's of users that liked insted of numebr of likes
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

// we're exporting mongoose model, so that we can run CRUD commands from different file
export default PostMessage;
