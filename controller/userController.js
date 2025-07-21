import Post from "../model/Post.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  let { fullName, email, password } = req.body;
  try {
    const alreadyUser = await User.findOne({ email });

    if (alreadyUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const registerUser = await User.create({
      fullName,
      email,
      password
    });
    const token = jwt.sign({ id: registerUser._id }, "token");
    const cookie = res.cookie("token", token);
    res.status(200).send("successfully");
  } catch (error) {
    res.send(error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).send("user not found");
    }

    if (findUser) {
      const isMatch = await findUser.comparePassword(password);

      if (!isMatch) {
        return res.status(500).send("password incorrect");
      }

      const token = jwt.sign({ id: findUser._id }, "token");
      const cookie = res.cookie("login", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 10000
      });
      res.status(200).json({
        message: "Login successful"
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const Home = async (req, res) => {
  let user = req.user.id;
  try {
    let find = await User.findOne({ _id: user });
    let findPosts = await Post.find({ author: find });
    res.status(200).json(findPosts);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "something went wrong"
    });
  }
};

export const addTask = async (req, res) => {
  let { title, description } = req.body;
  let findUser = req.user.id;
  try {
    let isMatch = await User.findOne({ _id: findUser });
    if (!isMatch) {
      return res.status(401).json({
        error: "User Not Found"
      });
    }
    const addPost = await Post.create({
      title,
      description,
      author: findUser
    });

    isMatch.post.push(addPost);
    await isMatch.save();
    res.status(200).json({
      post: "data save"
    });
    console.log(findUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

export const UpdatePost = async (req, res) => {
  let { id, title, description } = req.body;
  console.log(id, title, description);
  try {
    const find = await Post.findOne({ _id: id });
    if (find) {
      const update = await Post.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title,
            description
          }
        },
        {
          new: true
        }
      );
    }
    res.status(200).json({
      update: "update Successfully"
    });
  } catch (error) {
    res.status(401).json({
      error: error
    });
  }
};

export const DeletePost = async (req, res) => {
  let id = req.params.id;
  const post = await Post.findById(id);
  const deletedPost = await Post.findOneAndDelete({ _id: id });
  await User.findByIdAndUpdate(
    post.author,
    { $pull: { post: id } },
    { new: true }
  );
  res.status(200).json(deletedPost);
};

export const UserProfile = async (req, res) => {
  let id = req.user.id;

  const find = await User.findOne({ _id: id });
  console.log("user profile " + find);
  try {
    if (find) {
      let fullName = find.fullName;
      let length = find.post.length;
      let email = find.email;
      res.status(200).json({
        fullName: fullName,
        length: length,
        email: email
      });
    }
  } catch (error) {
    if (find.post.length === 0) {
      res.status(401).json({
        error: error
      });
    }
  }
};

export const Logout = async (req, res) => {
  res.clearCookie("login").json({
    message: "logout"
  });
};
