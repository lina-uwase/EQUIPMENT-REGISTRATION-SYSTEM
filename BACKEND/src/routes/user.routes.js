import express from "express";
import { validateBody } from "../middleware/validation.middleware.js";
import { loginSchema, userSchema } from "../utils/schema.js";
import { createUserHandler, getUserDetails, loginUser, verifyUser } from "../controllers/userController.js";
import checker from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password of the user
 */

//Register a new User
/**
 * @openapi
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 * 
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request payload
 *       '500':
 *         description: Internal server error
 */
router.post("/register",validateBody(userSchema),createUserHandler);

//User Login
/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.post("/login",validateBody(loginSchema),loginUser);

//Verify User's email
/**
 * @openapi
 * /api/v1/users/verify:
 *   post:
 *     summary: Verify a user's email
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: User email verified successfully
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.post("/verify",verifyUser);
/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Get user account details
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '500':
 *         description: Internal server error
 */
router.get("/account",checker,getUserDetails);
export default router;
