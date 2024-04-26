export type Role =
  | 'super_admin'
  | 'admin'
  | 'user'
  | 'admin_tutor'
  | 'admin_user';

export const userRoles: Role[] = [
  'super_admin',
  'admin',
  'user',
  'admin_tutor',
  'admin_user',
];

export const userFilterableField = [
  'searchTerm',
  'fullName',
  'role',
  'phoneNumber',
];
