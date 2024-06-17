import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createEmployee(req, res) {
  try {
    console.log("here")
    console.log(req.body)
    const {
      firstName,
      lastName,
      nationalId,
      telephone,
      email,
      department,
      position,
      laptopManufacturer,
      model,
      serialNumber
    } = req.body;

    const employee = await prisma.employee.create({
      data: {
      firstName,
      lastName,
      nationalId,
      telephone,
      email,
      department,
      position,
      laptopManufacturer,
      model,
      serialNumber
      },
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).send("Internal server error");
  }
}

export async function createDepartment(req, res) {
  try {
    const { name } = req.body;

    const department = await prisma.department.create({
      data: {
        name,
      },
    });

    return res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).send("Internal server error");
  }
}

export async function getDepartments(req, res) {
  try {
    const department = await prisma.department.findMany();

    return res.status(200).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).send("Internal server error");
  }
}

export async function getLaptops(req, res) {
  try {
    const laptop = await prisma.laptop.findMany();

    return res.status(200).json(laptop);
  } catch (error) {
    console.error("Error creating laptop:", error);
    return res.status(500).send("Internal server error");
  }
}

export async function createLaptop(req, res) {
  try {
    const { laptopManufacturer, laptopModel, serialNumber } = req.body;

    const laptop = await prisma.laptop.create({
      data: {
        laptopManufacturer,
        laptopModel,
        serialNumber,
      },
    });

    return res.status(201).json(laptop);
  } catch (error) {
    console.error("Error creating laptop:", error);
    return res.status(500).send("Internal server error");
  }
}

// Get all employees without pagination
export async function getAllEmployees(req, res) {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return res.status(200).json({ employeesData: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).send("Internal server error");
  }
}
