import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const checker = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      throw new Error("no token sent");
    }
    //Extract the token from the Authorizatino header
    const token = authHeader.split(" ")[1]; //
    console.log("token", token);  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    delete user.password;

    if (!user) {
      throw new Error("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "tokenExpiredError") {
      res.status(400).json({ error: "Token expired" });
    } else {
      res.status(400).json({ error: error.message });
    }
    res.locals.user = null;
  }
};
export default checker;
