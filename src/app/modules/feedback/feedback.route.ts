import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FeedbackValidation } from './feedback.validation';
import { FeedbackController } from './feedback.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.TUTOR,
  ),
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  FeedbackController.createFeedback,
);

router.get('/', FeedbackController.getAllFeedback);

export const FeedbackRouters = router;
