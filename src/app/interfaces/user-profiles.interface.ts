export interface UserDetails {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  city: string;
  companyId: string;
  createdOn: string;
  metaData: {
    SubscribedNewsletters: string;
  };
}

export interface UserProfiles {
  errors: {
    errors: string[];
  };
  result: {
    count: number;
    records: UserDetails[];
  };
  isSuccess: boolean;
}
