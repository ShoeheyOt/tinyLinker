import MyUrl from "../model/myUrl.model.js";

/**
 * this function is to render '/urls' with local variables which is a set of urls that a user owns
 * @param {*} req request from client
 * @param {*} res response to client
 */
export const getMyUrls = (req, res) => {
  const userId = req.session.userId;

  MyUrl.fetchUrls(userId, (data, err) => {
    if (err) {
      return res.status(500).render("error", {
        title: "Internal Server Error",
        message: "Something went wrong, couldn't get data from data base",
      });
    }

    res.render("urls", { urls: data });
  });
};

/**
 * this function is to render 'createNewUrl.ejs'
 * @param {*} req request from client
 * @param {*} res response to client
 */
export const getCreateNewUrl = (req, res) => {
  res.render("createNewUrl");
};

/**
 * this function is to redirect to '/urls' after successfully saving a new Url to database
 * @param {*} req request from client including a URL a he/she is trying to save.
 * @param {*} res response to client
 */
export const postCreateNewUrl = (req, res) => {
  const { newUrl } = req.body;

  const newLink = new MyUrl(newUrl, req.session.userId);

  newLink.saveUrl((data, err) => {
    if (err) {
      return res.status(500).render("error", {
        title: "Internal Server Error",
        message: "Something went wrong during saving, please try again",
      });
    } else {
      res.redirect("/urls");
    }
  });
};

/**
 * this function is to render 'oneUrls.ejs' with one particular url data from database
 * @param {*} req request from client including an id of url to be fetched
 * @param {*} res response to client
 */
export const getDynamicUrl = (req, res) => {
  const dynamicId = req.params.id;

  MyUrl.findOneUrl(dynamicId, (data, err) => {
    if (err) {
      return res.status(500).render("error", {
        title: "Internal Server Error",
        message: "Something went wrong during getting data. Please try again",
      });
    }

    res.render("oneUrls", { url: data });
  });
};

/**
 * this function is to redirect to 'urls' after updating url
 * @param {*} req request from client including new url to be changed and id to be associated with new url
 * @param {*} res response to client
 */
export const postDynamicUrl = (req, res) => {
  const dynamicId = req.params.id;
  const { editedUrl } = req.body;

  MyUrl.updateUrl(dynamicId, editedUrl, (data, err) => {
    if (err) {
      return res.status(500).render("error", {
        title: "Internal Server Error",
        message: "Something went wrong during updating, please try again",
      });
    }

    res.redirect("/urls");
  });
};

/**
 * this function is to redirect to 'urls' after deleting particular url
 * @param {*} req request from client including id of url which a client is willing to delete
 * @param {*} res response to client
 */
export const deleteUrl = (req, res) => {
  const dynamicId = req.params.id;

  MyUrl.deleteUrl(dynamicId, (data, err) => {
    if (err) {
      res.status(500).render("error", {
        title: "Internal Server Error",
        message: "Something went wrong during process, please try again.",
      });
    }

    res.redirect("/urls");
  });
};
