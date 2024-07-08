import bcrypt from "bcryptjs";

/**
 * a function to make password to be hashed
 * @param {*} password a password to be hashed
 * @param {*} saltRounds a number how many times the password would be salted
 * @returns hashed password
 */
export const hashPassword = async (password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);

  const hash = await bcrypt.hash(password, salt);

  return hash;
};

/**
 * a function to check whether client input password is matched with hashed password in database
 * @param {*} input a password a client input
 * @param {*} hashedPassword a hashed password saved in database
 * @returns boolean
 */
export const isMatch = async (input, hashedPassword) => {
  const result = await bcrypt.compare(input, hashedPassword);
  return result;
};
