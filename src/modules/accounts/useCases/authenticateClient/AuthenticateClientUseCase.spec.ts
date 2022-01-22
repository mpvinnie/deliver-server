import { AppError } from '../../../../shared/errors/AppError'
import { HashProviderInMemory } from '../../../clients/providers/hashProvider/in-memory/HashProviderInMemory'
import { ClientsRepositoryInMemory } from '../../../clients/repositories/in-memory/ClientsRepositoryInMemory'
import { AuthenticateClientUseCase } from './AuthenticateClientUseCase'

let clientsRepository: ClientsRepositoryInMemory
let hashProvider: HashProviderInMemory
let authenticateClient: AuthenticateClientUseCase

describe('AuthenticateClient', () => {
  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory()
    hashProvider = new HashProviderInMemory()
    authenticateClient = new AuthenticateClientUseCase(clientsRepository, hashProvider)
  })

  it('should be able to authenticate the client', async () => {
    const client = await clientsRepository.create({
      username: 'johndoe',
      password: 'hashed password'
    })

    const tokenResult = await authenticateClient.execute({
      username: 'johndoe',
      password: 'password'
    })

    expect(tokenResult).toHaveProperty('client')
    expect(tokenResult).toHaveProperty('token')
    expect(tokenResult.client).toBe(client)
  })

  it('should not be able to authenticate a non-existent client', async () => {
    await expect(authenticateClient.execute({
      username: 'non-existent-username',
      password: 'password'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate a non-existent client', async () => {
    await clientsRepository.create({
      username: 'johndoe',
      password: 'hashed password'
    })

    await expect(authenticateClient.execute({
      username: 'johndoe',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)
  })
})