export enum GetUserType {
  SETTING_RECOMMEND = 'setting_recommend',
  PROFILE_USER = 'profile_user',
  ALL = 'all',
}
export enum GetUserBy {
  ID = 'id',
  EMAIL = 'email',
}
export class GetUserDetailQueryProps {
  id?: string;
  getType: GetUserType;
  getBy: GetUserBy;
  email?: string;
}
export class GetUserDetailQuery {
  constructor(public readonly props: GetUserDetailQueryProps) {}
}
