export class GetAllRegisterUsersQuery {
  constructor(public readonly props: GetAllRegisterUsersQueryProps) {}
}
export class GetAllRegisterUsersQueryProps {
  id: string;
  search?: string;
  status?: string;
  specialty?: string;
  skills?: string[];
  interestedIn?: string[];
  sort?: string;
  page?: number = 1;
  limit?: number = 10;
}
