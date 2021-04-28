// Configuration
import "dotenv/config";
import "reflect-metadata";

// Oauth2
import passport from "passport";
import googleAuth from "../Routes/googleOauth";
import githubAuth from "../Routes/githubOauth";
import githubService from "../Services/passportGithub";
import googleService from "../Services/passportGoogle";

// Upload File
import { graphqlUploadExpress } from "graphql-upload";

// Security
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

// Server
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";

// Database
import mongo from "../Model/mongo";

// GraphQL
import createSchema from "../Graphql/schema";

// =================================================================================================

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const main = async () => {
  try {
    const app = express();
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(mongoSanitize());

    await mongo();
    await githubService();
    await googleService();

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(githubAuth);
    app.use(googleAuth);

    app.set("trust proxy", 1);

    app.use(cors(corsOptions));

    const schema = await createSchema();
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      uploads: false,
      playground: {
        settings: {
          "request.credentials": "include",
        },
      },
    });

    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 4 }));

    apolloServer.applyMiddleware({ app, cors: false });

    const port = process.env.PORT || 6000;
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}${apolloServer.graphqlPath}`));
  } catch (error) {
    console.log(error.message);
  }
};

main();
