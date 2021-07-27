import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

// we're exporting mongoose model, so that we can run CRUD commands from different file
export default mongoose.model("User", userSchema);
