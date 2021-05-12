// Oauth
import passport from "passport";

// Express
import express from "express";
const router = express.Router();

// ========================================================================================================

router.get("/auth/github", passport.authenticate("github", { scope: ["profile", "email"] }));

router.get("/auth/github/callback", passport.authenticate("github"), (_req, res) => {
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
