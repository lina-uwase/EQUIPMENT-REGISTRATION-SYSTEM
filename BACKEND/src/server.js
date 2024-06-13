import express from 'express';
import mariadb from 'mariadb';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import router from './routes/userRoutes.js';
// import router from '../routes/userRoutes.js';
// import router from './routes/userRoutes'


const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5173;
const SECRET_KEY = process.env.JWT_SECRET || 'e135e0505829e5e204c0f35f55744895ba9fd978ccc73f72566da592570b1415';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Lina@12!',
  database: 'restful',
};

const pool = mariadb.createPool(dbConfig);

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
// User Signup
// app.post('/signup', createUser());

// User Login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const conn = await pool.getConnection();
//     const query = 'SELECT * FROM employee WHERE email = ?';
//     const rows = await conn.query(query, [email]);
//     conn.release();

//     if (rows.length === 0) {
//       return res.status(400).send({ message: 'Invalid email or password' });
//     }

//     const user = rows[0];
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).send({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
//     res.status(200).send({ token });
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).send({ message: 'Failed to login user' });
//   }
// });

// // Protected Route Example: Fetch Employees
// app.get('/employees', verifyJWT, async (req, res) => {
//   try {
//     const conn = await pool.getConnection();
//     const employees = await conn.query('SELECT * FROM employee');
//     conn.release();
//     res.send(employees);
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     res.status(500).send({ message: 'Failed to fetch employees' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
