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


