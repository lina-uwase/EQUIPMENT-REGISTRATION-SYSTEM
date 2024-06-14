import express from 'express';
import mariadb from 'mariadb';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import router from './routes/userRoutes.js';
import { authenticateUser, createUser } from './controllers/userController.js';
// import router from '../routes/userRoutes.js';
// import router from './routes/userRoutes'


const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'e135e0505829e5e204c0f35f55744895ba9fd978ccc73f72566da592570b1415';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Lina@12!',
  database: 'restful',
};

const pool = mariadb.createPool(dbConfig);
export default pool;

pool.getConnection()
  .then(conn => {
    console.log('Connected to the database successfully!');
    conn.release();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
  });

const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token' });

    req.userId = decoded.id; // 
    next();
  });
};
app.use('api/v1/user', router)
//ser Signup
app.post('/signup', createUser());
//user login
app.post('/login',authenticateUser());

//Protected Route Example: Fetch Employees
app.get('/employees', verifyJWT, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const employees = await conn.query('SELECT * FROM employee');
    conn.release();
    res.send(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send({ message: 'Failed to fetch employees' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
