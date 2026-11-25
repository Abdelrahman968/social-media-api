import * as argon2 from "argon2";

export const hash = async (input: string): Promise<string> => {
  return argon2.hash(input);
};

export const verifyHash = async (
  hash: string,
  input: string,
): Promise<boolean> => {
  return argon2.verify(hash, input);
};
