export enum UserRoles {
  admin = "admin",
  farmer = "farmer",
  buyer = "buyer",
  vet = "vet",
}

export interface Users {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  hashed_password: string;
  role: UserRoles;
  created_at: string;
  is_email_verified: boolean;
  is_deactivated: boolean;
  is_deleted: boolean;
}
