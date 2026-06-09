import jwt from "jsonwebtoken";

const protect = (req, res, next) => {

  const auth =
    req.headers["authorization"];

  if (!auth) {

    return res.status(401).json({
      message:
        "No token provided"
    });

  }

  const token =
    auth.startsWith("Bearer ")
      ? auth.slice(7)
      : auth;

  try {

    req.admin =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    next();

  } catch {

    res.status(401).json({
      message:
        "Invalid or expired token"
    });

  }

};

export default protect;