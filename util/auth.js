import { hash, compare } from 'bcryptjs';

export const hashedPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  console.log(hashedPassword);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
