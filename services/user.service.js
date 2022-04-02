import { createUser } from "../repositories/user.repository.js";
import { hashPassword } from "../utils/encryption.js";

async function register({ username, password, email, name }) {
  const hashedPassword = await hashPassword(password);
  await createUser({ username, password: hashedPassword, email, name });
}

export const userService = {
  register,
};
