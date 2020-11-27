const routes = require("./routes");
const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Food Advisor";
  res.locals.routes = routes;
  res.locals.user = req.user || {}
  next();
};
module.exports = localsMiddleware;
