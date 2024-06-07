// pages/api/auth/signup.js

import connectDB from '@/db/connectdb';
import User from '@/models/User';
import { hashPassword } from '@/db/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password, shopname, phoneno, address } = req.body;

  if (!name || !email || !password || !shopname || !phoneno || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      shopname,
      phoneno,
      address,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
