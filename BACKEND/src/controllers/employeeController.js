// create a employee
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function createEmployee(req, res) {
  try {
    const {
      firstName,
      lastName,
      nationalId,
      telephone,
      email,
      departmentId,
      position,
      laptopId,
    } = req.body;

    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        nationalId,
        telephone,
        email,
        departmentId,
        position,
        laptopId,
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
// Get all employees
export async function getAllEmployees(req, res) {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const last_page = req.query.last_page;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    const totalCount = await prisma.employee.count();
    const totalPage = Math.ceil(totalCount / limit);
    const currentPage = page || 0;
    if (page < 0) {
      return res.status(400).json("Page value should not be negative");
    } else if (page === 1 && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.next = {
        page: page + 1,
        limit: limit,
      };
      result.employeesData = await prisma.employee.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
        include: { department: true, laptop: true },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.employeesData).length;
      result.range = currentPage * limit;
      return res.status(200).json(result);
    } else if (endIndex < totalCount && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.next = {
        page: page + 1,
        limit: limit,
      };
      result.employeesData = await prisma.employee.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.employeesData).length;
      result.range = currentPage * limit;
      return res.status(200).json(result);
    } else if (startIndex > 0 && !last_page) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = currentPage;
      result.previous = {
        page: page - 1,
        limit: limit,
      };
      result.employeesData = await prisma.employee.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.employeesData).length;
      result.range = currentPage * limit;
      return res.status(200).json(result);
    } else if (last_page === "true" && page === totalPage) {
      result.totalCount = totalCount;
      result.totalPage = totalPage;
      result.currentPage = totalPage;
      result.last = {
        page: totalPage,
        limit: limit,
      };
      result.employeesData = await prisma.employee.findMany({
        take: limit,
        skip: startIndex,
        orderBy: {
          id: "desc",
        },
      });
      res.paginatedResult = result;
      result.currentCountPerPage = Object.keys(result.employeesData).length;
      result.range = totalCount;
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).send("Internal server error");
  }
}
