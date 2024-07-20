import { connectToDatabase } from '../../utils/mongodb'; // Example of a MongoDB connection utility

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fullname, username, password } = req.body;

      // Validate input
      if (!fullname || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Connect to the database
      const { db } = await connectToDatabase();

      // Check if the username already exists
      const existingUser = await db.collection('users').findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Insert new user
      await db.collection('users').insertOne({
        fullname,
        username,
        password: hashedPassword,
        createdAt: new Date(),
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Example hash password function
async function hashPassword(password) {
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
