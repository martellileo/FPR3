import { Injectable } from '@nestjs/common';
import { Role } from '../auth/jwt-payload';

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export type PublicUser = Omit<UserRecord, 'password'>;

@Injectable()
export class UsersService {
  private readonly users: UserRecord[] = [
    { id: 1, name: 'Carlos Admin', email: 'admin@taskflow.com', password: '123456', role: 'admin' },
    { id: 2, name: 'Maria Souza', email: 'aluno@taskflow.com', password: '123456', role: 'user' },
    { id: 3, name: 'João Pereira', email: 'joao@taskflow.com', password: '123456', role: 'user' },
  ];

  findByEmail(email: string): UserRecord | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findAll(): PublicUser[] {
    return this.users.map(({ password, ...user }) => user);
  }
}
