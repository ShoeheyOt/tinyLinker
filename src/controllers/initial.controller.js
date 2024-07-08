/**
 * this function is redirecting to '/login' when a user visit '/'
 * @param {*} req request from client
 * @param {*} res response to client
 */
export const getInitialPage = (req, res) => {
  res.redirect("/login");
};
