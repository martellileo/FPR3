export type Role = 'user' | 'admin';

export interface JwtPayload {
  sub: number;
  name: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}
