import { AppError } from '../../../../shared/errors/AppError'
import { HashProviderInMemory } from '../../../clients/providers/hashProvider/in-memory/HashProviderInMemory'
import { DeliverersRepositoryInMemory } from '../../repositories/in-memory/DeliverersRepositoryInMemory'
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase'

let deliverersRepository: DeliverersRepositoryInMemory
let hashProvider: HashProviderInMemory
let createDeliveryman: CreateDeliverymanUseCase

describe('CreateDeliverers', () => {
  beforeEach(() => {
    deliverersRepository = new DeliverersRepositoryInMemory()
    hashProvider = new HashProviderInMemory()
    createDeliveryman = new CreateDeliverymanUseCase(deliverersRepository, hashProvider)
  })

  it('should be able to create a new deliveryman', async () => {
    const deliveryman = await createDeliveryman.execute({
      username: 'johndoe',
      password: 'password'
    })

    expect(deliveryman).toHaveProperty('id')
  })

  it('should not be able to create a deliveryman with an existent username', async () => {
    await createDeliveryman.execute({
      username: 'johndoe',
      password: 'password'
    })

    await expect(createDeliveryman.execute({
      username: 'johndoe',
      password: 'password'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a new deliveryman with a hashed password', async () => {
    const deliveryman = await createDeliveryman.execute({
      username: 'johndoe',
      password: 'password'
    })

    expect(deliveryman).toHaveProperty('id')
    expect(deliveryman.password).toBe('hashed password')
  })
})