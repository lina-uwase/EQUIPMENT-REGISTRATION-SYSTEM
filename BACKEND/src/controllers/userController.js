import pool from '../server.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sql from 'mssql';

export const createUser = ()=>{
   return async (req, res) => {
        const { email, password } = req.body;
    
        try {
          const conn = await pool.getConnection();
          const hashedPassword = await bcrypt.hash(password, 10);
          const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
          await conn.query(query, [email, hashedPassword]);
          conn.release();
          res.status(201).send({ message: 'User registered successfully!' });
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).send({ message: 'Failed to register user' });
        }
      }
}
const SECRET_KEY = process.env.JWT_SECRET || 'e135e0505829e5e204c0f35f55744895ba9fd978ccc73f72566da592570b1415';

export  const authenticateUser = () => {
return async (req, res) => {
const { email, password } = req.body;

try {
  
  const conn = await pool.getConnection();
  
  const query = 'SELECT * FROM users WHERE email = ?';
  const result = await conn.query(query, [email]);
  conn.release();
  

  if (!result || result.length === 0) {
    console.warn('No user found with email:', email);
    return res.status(400).send({ message: 'Invalid email or password' });
  }

  const user = result[0];
  const isMatch = await bcrypt.compare(password, user.password);
 
  if (!isMatch) {
    console.warn('Password does not match for user:', email);
    return res.status(400).send({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).send({ token });
} catch (error) {
  console.error('Error logging in user:', error);
  console.log(error);
  res.status(500).send({ message: 'Failed to login user' });
}
};
};







