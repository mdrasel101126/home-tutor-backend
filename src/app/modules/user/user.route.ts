import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginZodSchema),
  UserController.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken,
);

router.get(
  '/profile',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  UserController.ownProfile,
);

router.get(
  '/get-all-users',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
  ),
  UserController.getAllUsers,
);

router.get(
  '/single-user/:id',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.TUTOR,
  ),
  UserController.getSingleUser,
);

router.patch(
  '/profile',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  UserController.updateUser,
);

router.patch(
  '/profile/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  UserController.updateUserByAdmin,
);

router.patch(
  '/change-role/:id',
  validateRequest(UserValidation.changeRoleZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.changeRole,
);

router.patch(
  '/change-password',
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  validateRequest(UserValidation.changePasswordZodSchema),
  UserController.changePassword,
);

export const UserRouters = router;
