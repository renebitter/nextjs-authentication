import { hash } from 'bcryptjs';

const hashedPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  console.log(hashedPassword);
  return hashedPassword;
};
export default hashedPassword;
