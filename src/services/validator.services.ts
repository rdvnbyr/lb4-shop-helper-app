import {HttpErrors} from '@loopback/rest';
import * as isEmail from 'isemail';
import {Credentials} from '../repositories/user.repository';

export function validateCredentials(credentials: Credentials) {
  if (!isEmail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity('Error: Email is invalid');
  }
  if (credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'Error: Password is too short and must be at least 8 characters',
    );
  }
}
