import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'mongodb',
  url: 'mongodb+srv://rdvnbyr:CtF0AoKcm7qkQJuP@cluster0.e7gk5.mongodb.net/lb4-gen-app?retryWrites=true&w=majority',
  host: 'localhost',
  port: 27017,
  user: 'rdvnbyr',
  password: 'CtF0AoKcm7qkQJuP',
  database: 'myFirstDatabase',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
