import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from './lib/dbConnect';
import User from './models/User';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  res.status(200).json({ token });
}
