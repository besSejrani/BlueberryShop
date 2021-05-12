// Express
import express from "express";
const router = express.Router();

// Oauth
import passport from "passport";

// ========================================================================================================

router.get("/auth/twitter", passport.authenticate("twitter", { scope: ["profile", "email"] }));

router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000/products",
  }),
  (_req, res) => {
    res.redirect("http://localhost:3000");
  }
);

router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

export default router;
