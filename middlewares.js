const routes = require("./routes");
const jwt = require("jsonwebtoken");
const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Food Advisor";
  res.locals.routes = routes;
  res.locals.user = req.cookies.user || undefined;
  next();
};
const verifyToken = (req, res, next) => {
  try {
    const clientToken = req.cookies.user;
    const decodedToken = jwt.verify(clientToken, "test");
    if (!decodedToken) {
      res.status(401).json({ error: "token expired" });
    } else {
      console.log(decodedToken);
      next();
    }
  } catch (err) {
    res.clearCookie("user");
    res.status(401).json({ error: "unauthorized" });
  }
};
module.exports = { localsMiddleware, verifyToken };
