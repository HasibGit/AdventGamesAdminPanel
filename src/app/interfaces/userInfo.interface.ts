export interface UserInfo {
  errors: {
    errors: string[];
  };
  isSuccess: boolean;
  result: {
    city: string;
    companyId: string;
    fullName: string;
    userId: string;
    userName: string;
  };
}
