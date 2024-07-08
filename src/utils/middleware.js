import User from "../model/user.model.js";
import { isMatch } from "./bcrypt.js";

/**
 * a function to check whether input format is expected or not in 2 ways
 * 1. whether email includes '@'symbol, if it does, OK, otherwise render error.ejs
 * 2. whether email ends with '@' symbol, if it does, render error.ejs, if not, OK
 * @param {*} req request from client including email account
 * @param {*} res response to client including error handling if the format is wrong.
 * @param {*} next next function to be invoked if the format is OK
 * @returns renter error.ejs with status 400
 */
export const isRightFormatMiddleware = (req, res, next) => {
  const { email } = req.body;

  const isAddressIncluded = email.includes("@");

  const isEndOfAddress = email.slice(-1) !== "@" ? true : false;

  if (!isAddressIncluded || !isEndOfAddress) {
    return res.status(400).render("error", {
      title: "Bad Request",
      message: "Invalid Input",
    });
  } else {
    next();
  }
};

/**
 * a function to check if email is existed in database the function works differently depend on endpoint
 * 1. '/login': check email and password, if no email, response with 404, if password is not matched, response with 401, if both cleared add userId to session and invoke next
 * 2. '/register':if exist, response with 406, if not, invoke next
 * @param {*} req request from client including email, password and endpoint as baseUrl
 * @param {*} res response to client including error handling depend on the type
 * @param {*} next if no error, invoke this function
 */
export const isAccountExistMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const { baseUrl } = req;

  User.isRegistered({ email }, async (data, err) => {
    if (err) {
      return res.status(500).render("error", {
        title: "Internal Server Error",
        message: "could not read server",
      });
    }

    //in the case a user is in login page
    if (baseUrl === "/login") {
      if (!data) {
        return res.status(404).render("error", {
          title: "Not found",
          message: "The account doesn't exist",
        });
      }

      const isMatched = await isMatch(password, data.password);

      if (!isMatched) {
        return res.status(401).render("error", {
          title: "Unauthorized",
          message: "Wrong password",
        });
      }

      req.session.userId = data._id;
      next();
    }

    //in the case a use is in register page
    if (baseUrl === "/register") {
      if (data) {
        return res.status(406).render("error", {
          title: "Not Acceptable",
          message:
            "This email address is already in use. Please register with different address",
        });
      } else {
        next();
      }
    }
  });
};

/**
 * this function is to check whether logged in or not it works differently depend on endpoint
 * 1. '/urls' : if not logged in render unauthorized.ejs if so, go to next
 * 2. other than '/urls' : if logged in redirect to '/urls', if not, go to next
 * @param {*} req request from client including isLoggedIn from session and baseUrl
 * @param {*} res response to client
 * @param {*} next next function to be invoked depend on the situation
 */
export const isLoggedInMiddleware = (req, res, next) => {
  const { isLoggedIn } = req.session;
  const { baseUrl } = req;

  if (baseUrl === "/urls") {
    if (!isLoggedIn) {
      return res.render("unauthorized");
    } else {
      next();
    }
  }
  if (baseUrl !== "/urls") {
    if (isLoggedIn) {
      return res.redirect("/urls");
    } else {
      next();
    }
  }
};
