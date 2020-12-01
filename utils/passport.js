"use strict";
const bcrypt = require('bcryptjs')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");

// Passport local strategy for username-password login
passport.use(new LocalStrategy({usernameField:'email',passwordField:'password'},
async (username, password, done)=>{
    try{
        const user = await userModel.getUserLogin(username)
        if (user === undefined){
            return done(null,false,{
                message: 'No such email'
            })
        }if(!bcrypt.compareSync(password,user.password)){
            console.log('not same password')
            return done(null,false)
        }
            return done(null,{'user_id': username})
    }catch(error){
        return done(error)
    }
}))
passport.serializeUser((user,done)=>done(null,user))
passport.deserializeUser((user,done)=>done(null,user))
module.exports = passport;