import express from "express";
import path from "path";
import multer from "multer";
import {
  Home,
  Login,
  register,
  addTask,
  DeletePost,
  Logout,
  UpdatePost,
  UserProfile
} from "../controller/userController.js";
import { isLogging } from "../middleware/loginAuth.js";
import file from "../model/File.js";

const route = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage });

route.post("/register", register);
route.post("/login", Login);
route.get("/user", isLogging, Home);
route.get("/auth/check", isLogging, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});
route.post("/user/add", isLogging, addTask);
route.post("/user/update", isLogging, UpdatePost);
route.get("/user/profile", isLogging, UserProfile);
route.post(
  "/profileUpdate",
  isLogging,
  upload.single("file"),
  async (req, res) => {
    let fileData = await file.create({
      id: req.user.id,
      file: req.file.filename
    });

    if (fileData) {
      res.status(200).json({
        message: "successfully"
      });
    }
  }
);
route.get("/profile", isLogging, async (req, res) => {
  let id = req.user.id;
  let findFile = await file.findOne({ id: id });
  res.status(200).json({
    fileName: findFile.file
  });
});
route.get("/logout", Logout);
route.delete("/deletePost/:id", isLogging, DeletePost);

export default route;
