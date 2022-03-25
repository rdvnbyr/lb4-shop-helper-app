import {inject} from '@loopback/core';
import {compare, genSalt, hash} from 'bcryptjs';
import {PasswordHasherBindings} from '../keys';

export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}

export class BcryptHasher implements PasswordHasher<string> {
  constructor(@inject(PasswordHasherBindings.ROUNDS) readonly rounds: number) {}

  async comparePassword(providedPass: string, storedPass: string): Promise<boolean> {
    const compared = await compare(providedPass, storedPass);
    return compared as boolean;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.rounds);
    const hashed = await hash(password, salt);
    return hashed as string;
  }
}
