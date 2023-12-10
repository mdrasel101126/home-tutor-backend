/* eslint-disable no-unused-vars */

type ICustormerName = {
  firstName: string;
  lastName: string;
};
export type ICusomer = {
  name: ICustormerName;
  email: string;
  contactNo: string;
  division: string;
  district: string;
  policeStation: string;
};

/* export type CusomerModel = {
  isCusomerExist(id: string): Promise<ICusomer>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<ICusomer>;
 */
/* export type ICusomerCreateResponse = {
  Cusomer: ICusomer;
  accessToken: string;
}; */
/* export type ICusomerLoginResponse = {
  accessToken: string;
}; */
