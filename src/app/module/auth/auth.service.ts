import userRepository from "@/app/db/repository/user.repository.js";
import type { CreateUserDTO } from "@/app/types/user.types.js";
import { hash } from "@/app/utils/argon/hash.js";

export const registerService = async (body: CreateUserDTO) => {
  const { email, username, password } = body;

  await userRepository.ensureAvailable("email", email);
  await userRepository.ensureAvailable("username", username);

  const hashedPassword = await hash(password);

  const newUser = await userRepository.create({
    ...body,
    password: hashedPassword,
  });

  return newUser;
};
