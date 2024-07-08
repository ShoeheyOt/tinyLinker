/**
 * this function is to render landing.ejs page with local variable
 * @param {*} req request from client
 * @param {*} res response to client
 */
export const getLoginPage = (req, res) => {
  res.render("landing", { landingTitle: "Login" });
};

/**
 * this function is setting a true flag in session for protection and redirect to /urls
 * @param {*} req request from client
 * @param {*} res response to client
 */

export const postLogin = (req, res) => {
  req.session.isLoggedIn = true;

  res.redirect("urls");
};
