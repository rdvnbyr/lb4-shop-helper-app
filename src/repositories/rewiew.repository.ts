import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Rewiew, RewiewRelations} from '../models';

export class RewiewRepository extends DefaultCrudRepository<
  Rewiew,
  typeof Rewiew.prototype.id,
  RewiewRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Rewiew, dataSource);
  }
}
