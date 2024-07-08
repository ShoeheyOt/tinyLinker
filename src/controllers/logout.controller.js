/**
 * this function is to redirect to'/login' page with changing 'isLoggedIn' flag to false before destroy it
 * @param {*} req request from client
 * @param {*} res response to client
 */
export const postLogout = (req, res) => {
  req.session.isLoggedIn = false;

  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).render("error", {
        title: "Internal Server Error",
        message: "Something went wrong during session closed",
      });
    } else {
      console.log("successfully session closed");
      res.clearCookie("connect.sid");
      res.redirect("login");
    }
  });
};
