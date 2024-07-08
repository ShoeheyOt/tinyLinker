import User from "../model/user.model.js";
import { hashPassword } from "../utils/bcrypt.js";

/**
 * this function is to render landing.ejs with local variable
 * @param {*} req request from client
 * @param {*} res response to client
 */
export const getRegisterPage = (req, res) => {
  res.render("landing", { landingTitle: "Register" });
};

/**
 * this function is to redirect to '/login' after newly created user with hashed password is saved to database
 * @param {*} req request from client
 * @param {*} res response to client
 */
export const postRegister = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await hashPassword(password, 12);

  const newUser = new User(email, hashedPassword);

  newUser.createUser();

  res.redirect("/login");
};
