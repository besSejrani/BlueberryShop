// Configuration
import "dotenv/config";
import "reflect-metadata";

// Oauth2
import passport from "passport";
import githubService from "../Services/passportGithub";
import googleService from "../Services/passportGoogle";

// Upload File
import { graphqlUploadExpress } from "graphql-upload";

// Security
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

// Server
import express, { Request, Response, NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";

// Routes
import googleAuth from "@Routes/Oauth2/googleOauth";
import githubAuth from "@Routes/Oauth2/githubOauth";
import stripeWebhooks from "@Routes/Stripe/Webhooks";
import pdfKit from "@Routes/PDF/index";
import unhandledRoute from "@Routes/AnyRoute/unhandledRoute";

// Errors
import { NotFoundError } from "src/Error/Errors/NotFoundError";

// Database
import mongo from "@Model/mongo";

// GraphQL
import createSchema from "@Graphql/schema";

// =================================================================================================

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app = express();

const main = async () => {
  // Middlewares
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(mongoSanitize());

  // Services
  await mongo();
  await githubService();
  await googleService();

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Rest Routes
  app.use(githubAuth);
  app.use(googleAuth);
  app.use(stripeWebhooks);
  app.use(pdfKit);

  // Configuration
  app.set("trust proxy", 1);
  app.use(cors(corsOptions));

  // Apollo
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

  // Unhandled Route & Global Error handling middleware
  app.use(unhandledRoute);

  app.use((err: NotFoundError, _: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json(err.serializeErrors());
    next(err);
  });
};

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

main();

export const application = app;
