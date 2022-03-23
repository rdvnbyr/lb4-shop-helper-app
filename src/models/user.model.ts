import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false, hiddenProperties: ['password']}})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 100,
      uniqueItems: true,
      errorMessage: {
        uniqueItems: 'User name already exists',
      },
    },
  })
  username: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email',
      uniqueItems: true,
      errorMessage: {
        uniqueItems: 'Email already in use',
      },
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 8,
      maxLength: 14,
      errorMessage: 'Password must be between 8 and 14 characters',
    },
  })
  password: string;

  @property({
    type: 'string',
    default: '',
    jsonSchema: {
      maxLength: 100,
      errorMessage: 'First name must be less than 100 characters',
    },
  })
  fullname?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['user', 'admin'],
    },
  })
  role: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
