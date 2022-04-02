import bcrypt from "bcrypt";

const hashPassword = async password => {
  const SALT_ROUNDS = 10;

  return await bcrypt.hash(password, SALT_ROUNDS);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
