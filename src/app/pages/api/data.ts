import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware from '../../lib/authMiddleware';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const user = await User.findById((req as any).user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ data: 'This is protected data', user });
}

export default authMiddleware(handler);
