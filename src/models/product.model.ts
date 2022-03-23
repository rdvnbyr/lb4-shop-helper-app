import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Rewiew} from './rewiew.model';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Product extends Entity {
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
      maxLength: 180,
      uniqueItems: true,
      errorMessage: {
        uniqueItems: 'Product title already exists',
      },
    },
  })
  title: string;
  @property({
    type: 'string',
    reqired: true,
    jsonSchema: {
      maxLength: 400,
      errorMessage: 'Product description must be less than 400 characters',
    },
  })
  description: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 180,
      errorMessage: 'Image title must be less than 180 characters',
    },
  })
  image: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
      errorMessage: 'Price must be greater than 0',
    },
  })
  price: number;

  @property({
    type: 'number',
    default: 0,
    jsonSchema: {
      minimum: 0,
      maximum: 5,
      errorMessage: 'Rating must be between 0 and 5',
    },
  })
  rating?: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  stock: number;

  @hasMany(() => Rewiew)
  reviews?: Rewiew[];

  @belongsTo(() => User)
  creator: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
