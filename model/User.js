import mongoose from "mongoose";
import bcrypt from "bcrypt";
mongoose.connect("mongodb://localhost:27017/TaskManagementSystem");
const UserSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const genSalt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, genSalt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("user", UserSchema);
export default User;
