import express from "express"
import {createDepartment, createEmployee, createLaptop,getAllEmployees,getDepartments, getLaptops} from "../controllers/employeeController.js";
import {validateBody} from "../middleware/validation.middleware.js";
import { employeeSchema } from "../utils/schema.js";
import checker from "../middleware/auth.middleware.js"

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         make:
 *           type: string
 *         model:
 *           type: string
 *         year:
 *           type: number
 *         owner:
 *           type: string
 *           format: uuid
 */
/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '403':
 *         description: Forbidden - User does not have admin role
 *       '500':
 *         description: Internal server error
 */


router.get("/", getAllEmployees);


// Create a new employee
/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the employee
 *               lastName:
 *                 type: string
 *                 description: Last name of the employee
 *               nationalId:
 *                 type: string
 *                 description: National ID of the employee
 *               telephone:
 *                 type: string
 *                 description: Telephone number of the employee
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the employee
 *               department:
 *                 type: string
 *                 description: Department of the employee
 *               position:
 *                 type: string
 *                 description: Position of the employee
 *               laptopManufacturer:
 *                 type: string
 *                 description: Manufacturer of the laptop
 *               laptopModel:
 *                 type: string
 *                 description: Model of the laptop
 *               serialNumber:
 *                 type: string
 *                 description: Serial number of the laptop
 *             required:
 *               - firstName
 *               - lastName
 *               - nationalId
 *               - telephone
 *               - email
 *               - department
 *               - position
 *               - laptopManufacturer
 *               - laptopModel
 *               - serialNumber
 *     responses:
 *       '200':
 *         description: Employee created successfully
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '403':
 *         description: Forbidden - User does not have admin role
 *       '500':
 *         description: Internal server error
 */
router.post("/create", checker,validateBody(employeeSchema), createEmployee);
router.get("/getAllEmployees",checker,getAllEmployees);
router.post("/laptop", checker, createLaptop);
router.post("/department", checker, createDepartment);
router.get("/departments", checker, getDepartments);
router.get("/laptops", checker, getLaptops);

export default router;
