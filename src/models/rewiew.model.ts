import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Product} from './product.model';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Rewiew extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 200,
    },
  })
  title: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 1000,
    },
  })
  comment?: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Product)
  productId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Rewiew>) {
    super(data);
  }
}

export interface RewiewRelations {
  // describe navigational properties here
}

export type RewiewWithRelations = Rewiew & RewiewRelations;
