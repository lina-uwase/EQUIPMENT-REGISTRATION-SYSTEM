import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function createUserHandler(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (password !== confirmPassword)
      return res.status(400).send("Password don't match confirm password");
    if (existingUser) {
      return res.status(409).send("User already exists");
    }
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
      email,
      password: hashedPassword,
    };
    const user = await prisma.user.create({ data: data });
    console.log(user, "the user");
    delete user.password;
    return res.status(201).send(user);
  } catch (e) {
    console.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getUserDetails(req, res) {
  try {
    const user = req.user;
    if (user) return res.status(200).send(user);
    return res.status(404).send("User not found");
  } catch (e) {
    console.error(e);
    return res.status(409).send(e.message);
  }
}
export async function verifyUser(req, res) {
  try {
    const { email } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return res.status(409).send("That account don't exist");
    }
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        ...existingUser,
        verified: true,
      },
    });
    if (updatedUser) return res.status(201).send("User verified succesfully");
  } catch (e) {
    console.error(e);
    return res.status(409).send(e.message);
  }
}

// Login user and generate JWT token
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({userId : user.id},process.env.JWT_SECRET);
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Other controller methods...
