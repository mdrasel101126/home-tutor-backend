export type Gender = 'male' | 'female' | 'others';

export const tutorGender: Gender[] = ['male', 'female', 'others'];

export type Medium = 'bangla' | 'english' | 'bangla english both';

export const tutorMedium: Medium[] = [
  'bangla',
  'english',
  'bangla english both',
];

export type Group = 'science' | 'commerce' | 'arts';

export const tutorGroup: Group[] = ['science', 'commerce', 'arts'];

export type CurrentStatus = 'available' | 'unavailable';

export const tutorCurrentStatus: CurrentStatus[] = ['available', 'unavailable'];

export type PreferredClass =
  | '1-5'
  | '6-8'
  | '9-10'
  | '11-12'
  | '1-8'
  | '1-10'
  | '5-10'
  | '1-12'
  | '9-12'
  | 'Honours'
  | 'IELTS';

export const tutorPreferredClass: PreferredClass[] = [
  '1-5',
  '6-8',
  '9-10',
  '11-12',
  '1-8',
  '1-10',
  '5-10',
  '1-12',
  '9-12',
  'Honours',
  'IELTS',
];

export type Status =
  | 'request'
  | 'processing'
  | 'accepted'
  | 'confirm'
  | 'disapproved';

export const statusInfo: Status[] = [
  'request',
  'processing',
  'accepted',
  'disapproved',
  'confirm',
];

export const tutorFilterableField = [
  'searchTerm',
  'lowestExpectedSalary',
  'highestExpectedSalary',
  'fullName',
  'gender',
  'medium',
  'institution',
  'group',
  'subject',
  'expertIn',
  'currentStatus',
  'preferredClass',
];
