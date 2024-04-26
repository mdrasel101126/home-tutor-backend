import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { ApplicationRouters } from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing
app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Welcome to Tutoring service.',
  });
});

app.use('/api/v1', ApplicationRouters);

app.use(globalErrorHandler);

// No routes
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'Not found.',
    errorMessage: {
      path: req.originalUrl,
      message: 'Api not found!!! Wrong url, there is no route in this url.',
    },
  });
});

export default app;
