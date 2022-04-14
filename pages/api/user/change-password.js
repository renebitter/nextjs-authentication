import { getSession } from 'next-auth/react';
import { hashPassword, verifyPassword } from '../../../util/auth';
import { connectToDatabase } from '../../../util/db';

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return;
  }
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection('users');
  const user = await usersCollection.findOne({ email: userEmail });

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  const hashedPw = await hashPassword(newPassword);

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Not authorized.' });
    client.close();
    return;
  }

  if (!newPassword || newPassword.trim().length < 7) {
    res
      .status(422)
      .json({ message: 'Password should be at least 7 characters long.' });
    client.close();
    return;
  }

  await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPw } }
  );
  client.close();
  res.status(200).json({ message: 'Password updated!' });
};
export default handler;
