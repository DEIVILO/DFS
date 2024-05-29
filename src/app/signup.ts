import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from './lib/dbConnect';
import User, { IUser } from './models/User';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: IUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ message: 'User creation failed', error });
  }
}
