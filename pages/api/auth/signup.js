import { connectToDatabase } from '../../../util/db';
import { hashPassword } from '../../../util/auth';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password } = data;

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    const hashedPw = await hashPassword(password);

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: 'Password should be at least 7 characters long.',
      });
      client.close();
      return;
    }

    if (existingUser) {
      res.status(422).json({ message: 'User exists already!' });
      client.close();
      return;
    }

    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPw,
    });

    res.status(201).json({ message: 'User created!' });
    client.close();
  }
};

export default handler;
