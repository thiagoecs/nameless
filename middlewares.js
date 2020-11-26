const routes = require("./routes");
const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Food Advisor";
  res.locals.routes = routes;
  next();
};
module.exports = localsMiddleware;
