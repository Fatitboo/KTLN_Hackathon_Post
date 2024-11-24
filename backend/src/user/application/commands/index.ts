import { LoginUserHandler } from './login/login-user.handler';
import { RegisterToHackathonHandler } from './register-to-hackathon/register-to-hackathon.handler';
import { RegisterUserHandler } from './register-user/register-user.handler';
import { UpdateUserHandler } from './update-user/update-user.handler';
import { VerifyEmailHandler } from './verify-email/verify-email.handler';
export default [
  LoginUserHandler,
  RegisterUserHandler,
  VerifyEmailHandler,
  UpdateUserHandler,
  RegisterToHackathonHandler,
];
