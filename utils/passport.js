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
        // sending message when there's no registered email
        if (!user) {
          throw Error("email error");
        }
        // sending error when password is not correct
        if (!bcrypt.compareSync(password, user.password)) {
          throw Error("password error");
        }
        // return user when succeeded to login
        return done(null, user, { message: "Logged In Successfully" });
      } catch (err) {
        console.log(err);
        return done(err);
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
      passReqToCallback: true,
    },
    async (req, token, done) => {
      try {
        console.log("jwtPayload: ", token);
        const user = await userModel.getUser(token.user);
        if (user) {
          const plainUser = { ...user };
          req.user = plainUser;
          return done(null, plainUser);
        } else {
          return done(null, false);
        }
      } catch (e) {
        console.log(e);
        return done(e, false);
      }
    }
  )
);
module.exports = passport;
