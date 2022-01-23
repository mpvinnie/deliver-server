import { AppError } from '../../../../shared/errors/AppError'
import { HashProviderInMemory } from '../../../clients/providers/hashProvider/in-memory/HashProviderInMemory'
import { DeliverersRepositoryInMemory } from '../../../deliverers/repositories/in-memory/DeliverersRepositoryInMemory'
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliveryUseCase'

let deliverersRepository: DeliverersRepositoryInMemory
let hashProvider: HashProviderInMemory
let authenticateDeliveryman: AuthenticateDeliverymanUseCase

describe('AuthenticateDeliveryman', () => {
  beforeEach(() => {
    deliverersRepository = new DeliverersRepositoryInMemory()
    hashProvider = new HashProviderInMemory()
    authenticateDeliveryman = new AuthenticateDeliverymanUseCase(deliverersRepository, hashProvider)
  })

  it('should be able to authenticate the deliveryman', async () => {
    const deliveryman = await deliverersRepository.create({
      username: 'johndoe',
      password: 'hashed password'
    })

    const tokenResult = await authenticateDeliveryman.execute({
      username: 'johndoe',
      password: 'password'
    })

    expect(tokenResult).toHaveProperty('deliveryman')
    expect(tokenResult).toHaveProperty('token')
    expect(tokenResult.deliveryman).toBe(deliveryman)
  })

  it('should not be able to authenticate a non-existent deliveryman', async () => {
    await expect(authenticateDeliveryman.execute({
      username: 'non-existent-username',
      password: 'password'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate a deliveryman with a wrong password', async () => {
    await deliverersRepository.create({
      username: 'johndoe',
      password: await hashProvider.hashPassword('password')
    })

    await expect(authenticateDeliveryman.execute({
      username: 'johndoe',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)
  })
})