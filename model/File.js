import mongoose from "mongoose";

const FileSchema = mongoose.Schema({
  id: String,
  file: String
});

const file = mongoose.model("File", FileSchema);
export default file;
