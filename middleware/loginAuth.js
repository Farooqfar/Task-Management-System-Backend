import jwt from "jsonwebtoken";

export const isLogging = (req, res, next) => {
  try {
    if (!req.cookies.login) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.verify(req.cookies.login, "token");
    req.user = token;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
