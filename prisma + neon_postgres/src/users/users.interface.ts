export type Role = 'ADMIN' | 'INTERN' | 'USER';

export interface User {
  name: string;
  email: string;
  role: Role;
}
