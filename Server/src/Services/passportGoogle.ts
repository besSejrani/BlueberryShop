// Configuration
import "dotenv/config";

// Random
import { v4 as uuid } from "uuid";

// Database
import { UserModel } from "../Model/user/User";

// OAuth2
import passport from "passport";
import { Strategy } from "passport-google-oauth20";

// ========================================================================================================

const googleOAuth = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      console.log(error.message);
    }
  });

  passport.use(
    new Strategy(
      {
        clientID: `${process.env.GOOGLE_ID}`,
        clientSecret: `${process.env.GOOGLE_SECRET}`,
        callbackURL: "http://localhost:4000/auth/google/callback",
        proxy: true,
      },
      async (_accessToken, _refreshToken, profile, done: any) => {
        try {
          const {
            _json: { sub, name, picture, email },
          } = await profile;

          const user = await UserModel.findOne({ googleId: sub });

          if (!user) {
            const user = await new UserModel({
              googleId: sub,
              username: name,
              profileImageUrl: picture,
              email,
              password: `${uuid()}`,
              confirmed: true,
              role: "user",
            });
            await user.save();

            return done(null, user);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    )
  );
};

export default googleOAuth;
