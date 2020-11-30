"use strict";
// This file manages passport strategies.
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
    // set username field as email
    { usernameField: "email" },
    // parmeters' names should same as names from html-form
    async (email, password, done) => {
      try {
        // find user with email from user database
        const user = await userModel.getUserLogin(email);
        // send message when there's no registered email
        if (!user) {
          return done(null, false, {
            message: "No such email",
          });
        }
        // send message when password
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "no same password" });
        }
        // return user when succeeded to login
        return done(null, user, { message: "Logged In Successfully" });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

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
        const user = await userModel.getUser(jwtPayload.user_id);
        if (user === undefined) {
          return done(null, false, { message: "incorrect ID" });
        }
        req.user = user;
        return done(null, user);
      } catch (e) {
        console.log(e);
        return done(e);
      }
    }
  )
);
module.exports = passport;
