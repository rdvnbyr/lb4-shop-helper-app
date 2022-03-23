import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Rewiew} from '../models';
import {RewiewRepository} from '../repositories';

export class ReviewController {
  constructor(
    @repository(RewiewRepository)
    public rewiewRepository : RewiewRepository,
  ) {}

  @post('/rewiews')
  @response(200, {
    description: 'Rewiew model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rewiew)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rewiew, {
            title: 'NewRewiew',
            exclude: ['id'],
          }),
        },
      },
    })
    rewiew: Omit<Rewiew, 'id'>,
  ): Promise<Rewiew> {
    return this.rewiewRepository.create(rewiew);
  }

  @get('/rewiews/count')
  @response(200, {
    description: 'Rewiew model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rewiew) where?: Where<Rewiew>,
  ): Promise<Count> {
    return this.rewiewRepository.count(where);
  }

  @get('/rewiews')
  @response(200, {
    description: 'Array of Rewiew model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rewiew, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rewiew) filter?: Filter<Rewiew>,
  ): Promise<Rewiew[]> {
    return this.rewiewRepository.find(filter);
  }

  @patch('/rewiews')
  @response(200, {
    description: 'Rewiew PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rewiew, {partial: true}),
        },
      },
    })
    rewiew: Rewiew,
    @param.where(Rewiew) where?: Where<Rewiew>,
  ): Promise<Count> {
    return this.rewiewRepository.updateAll(rewiew, where);
  }

  @get('/rewiews/{id}')
  @response(200, {
    description: 'Rewiew model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rewiew, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Rewiew, {exclude: 'where'}) filter?: FilterExcludingWhere<Rewiew>
  ): Promise<Rewiew> {
    return this.rewiewRepository.findById(id, filter);
  }

  @patch('/rewiews/{id}')
  @response(204, {
    description: 'Rewiew PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rewiew, {partial: true}),
        },
      },
    })
    rewiew: Rewiew,
  ): Promise<void> {
    await this.rewiewRepository.updateById(id, rewiew);
  }

  @put('/rewiews/{id}')
  @response(204, {
    description: 'Rewiew PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rewiew: Rewiew,
  ): Promise<void> {
    await this.rewiewRepository.replaceById(id, rewiew);
  }

  @del('/rewiews/{id}')
  @response(204, {
    description: 'Rewiew DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rewiewRepository.deleteById(id);
  }
}
