import { connectToDatabase } from '../../../util/db';
import hashedPassword from '../../../util/auth';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          'Invalid input - password should also be at least 7 characters long.',
      });
      return;
    }

    const client = await connectToDatabase();

    const hashedPw = await hashedPassword(password);

    const db = client.db();

    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPw,
    });

    res.status(201).json({ message: 'Created user!' });
  }
};

export default handler;
