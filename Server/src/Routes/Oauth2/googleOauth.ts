// Express
import express from "express";
const router = express.Router();

// Oauth
import passport from "passport";

// ========================================================================================================

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", passport.authenticate("google"), (_req, res) => {
  res.redirect("http://localhost:3000");
});

router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

export default router;
