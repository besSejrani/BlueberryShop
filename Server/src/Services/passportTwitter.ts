// Configuration
import "dotenv/config";

// // Random
// import { v4 as uuid } from "uuid";

// Database
import { UserModel } from "../Model/user/User";

// OAuth2
import passport from "passport";
import { Strategy } from "passport-twitter";

// ========================================================================================================

const githubOAuth = async () => {
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

  await passport.use(
    new Strategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET_KEY,
        callbackURL: "http://localhost:4000/auth/twitter/callback",
      },
      async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
        try {
          // const {
          //   _json: { id, name, avatar_url, email },
          // } = await profile;

          console.log(profile, done);

          // const user = await UserModel.findOne({ githubId: id });

          // if (!user) {
          //   const user = await new UserModel({
          //     githubId: id,
          //     username: name,
          //     profileImageUrl: avatar_url,
          //     email,
          //     password: `${uuid()}`,
          //     confirmed: true,
          //     role: "user",
          //   });
          //   await user.save();
          // }

          // return done(null, user);
        } catch (error) {
          console.log(error.message);
        }
      }
    )
  );
};

export default githubOAuth;
