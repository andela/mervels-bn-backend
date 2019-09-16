/* eslint-disable no-unused-vars */
import express from "express";
import passport from "passport";
import Users from "../../controllers/userController";
import "../../config/passport";
import userValidator from "../../validation/userValidator";
import verify from "../../middlewares/auth";

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.post("/signup", userValidator.validateSignup, Users.createUser);
router.post("/signin", userValidator.validateSignIn, Users.logIn);
router.post("/createLink", userValidator.validateSendLink, Users.sendLink);
router.patch("/verify/", userValidator.validateVerifyLink, Users.verify);
router.post("/signout", verify, Users.logout);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google"),
  Users.socialLogin
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  Users.socialLogin
);
router.post("/requestPasswordReset", Users.requestPasswordReset);
router.patch(
  "/resetPassword/:userId/:token",
  userValidator.resetPassword,
  Users.resetPassword
);
router.post("/forgotPassword", Users.requestPasswordReset);
router.put(
  "/resetPassword/:userId/:token",
  userValidator.resetPassword,
  Users.resetPassword
);

module.exports = router;
