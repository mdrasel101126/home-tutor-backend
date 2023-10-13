import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import Routes from "./app/routes";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cors());

//parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//application routes
app.use("/api/v1/", Routes);

//global error handler
app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
