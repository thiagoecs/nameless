"use strict";
const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");

// Passport local strategy for username-password login
passport.use(
  new LocalStrategy(
    { usernameField: "email"},
    async (email, password, done) => {
      try {
        const user = await userModel.getUserLogin(email);
        if (user === undefined) {
          return done(null, false, {
            message: "No such email",
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "no same password" });
        }
        return done(null, user, { message: "Logged In Successfully" });
      } catch (error) {
          console.log(error)
        return done(error);
      }
    }
  )
);
//passport.serializeUser((user,done)=>done(null,user))
//passport.deserializeUser((user,done)=>done(null,user))

//JWT strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "test",
    },
    async (jwtPayload, done) => {
      try {
        console.log("jwtPayload: ", jwtPayload);
        const user = await userModel.getUser(jwtPayload.id);
        if (user === undefined) {
          return done(null, false, { message: "incorrect ID" });
        }
        //req.user = user
        return done(null, user);
      } catch (e) {
        console.log(e);
        return done(e);
      }
    }
  )
);
module.exports = passport;
