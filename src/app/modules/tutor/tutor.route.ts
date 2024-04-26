import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { TutorValidation } from './tutor.validation';
import { TutorController } from './tutor.controller';
import { UserValidation } from '../user/user.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(TutorValidation.createTutorZodSchema),
  TutorController.createTutor,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginZodSchema),
  TutorController.loginTutor,
);

router.patch(
  '/change-password',
  auth(ENUM_USER_ROLE.TUTOR),
  validateRequest(UserValidation.changePasswordZodSchema),
  TutorController.changePassword,
);

router.get('/profile', auth(ENUM_USER_ROLE.TUTOR), TutorController.ownProfile);

router.get('/single-tutor/:id', TutorController.getSingleTutorByUser);

router.get('/all-tutors', TutorController.getAllTutorsByUser);

router.get(
  '/admin',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  TutorController.getAllTutorsByAdmin,
);

router.get(
  '/admin/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  TutorController.getSingleTutorByAdmin,
);

router.patch(
  '/accept-request/:userId',
  auth(ENUM_USER_ROLE.TUTOR),
  TutorController.acceptBookingRequest,
);

router.delete(
  '/cancel-request/:userId',
  auth(ENUM_USER_ROLE.TUTOR),
  TutorController.cancelBookingRequest,
);

router.patch(
  '/profile/:id',
  validateRequest(TutorValidation.updateTutorZodSchema),
  auth(
    ENUM_USER_ROLE.TUTOR,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
  ),
  TutorController.updateProfile,
);

router.post(
  '/review/:id',
  validateRequest(TutorValidation.reviewTutorZodSchema),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.USER,
  ),
  TutorController.reviewTutor,
);

export const TutorRouters = router;
